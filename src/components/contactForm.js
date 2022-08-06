import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import TextArea from "./TextArea";

const StyledContactForm = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 10px;
  margin-bottom: 50px;
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
  }

  p {
    font-size: 22px;
    text-align: center;
    width: 100%center;
    max-width: 600px;
    margin: 0 auto;
    padding-top: 10px;
  }
`;

function ContactForm({ productId }) {
  const form = useRef();
  const [sent, setSent] = useState(false);

  const handleSendEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE,
        process.env.REACT_APP_EMAILJS_TEMPLATE,
        form.current,
        process.env.REACT_APP_EMAILJS_KEY
      );
      if (response.status === 200) {
        setSent(true);
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <StyledContactForm>
      <p>
        Vous souhaitez nous contacter au sujet de ce bien ? Remplissez le
        formulaire ci-dessous et nous vous répondrons rapidement.
      </p>
      <form ref={form} onSubmit={handleSendEmail}>
        <Input type={"text"} placeholder={"Votre nom"} name="name"></Input>
        <p></p>
        <Input
          type={"email"}
          placeholder={"Email: example@email.com"}
          name="mail"
        ></Input>
        <p></p>
        <TextArea
          placeholder="Ajoutez un message ici"
          rows={5}
          name="message"
        ></TextArea>
        <p></p>
        <Input
          type={"text"}
          hidden={true}
          name="productId"
          value={productId}
          readOnly={true}
        ></Input>
        <Button onClick={(e) => handleSendEmail(e)}>
          <FontAwesomeIcon icon={faPaperPlane} />
          Envoyer
        </Button>
      </form>
    </StyledContactForm>
  );
}

export default ContactForm;
