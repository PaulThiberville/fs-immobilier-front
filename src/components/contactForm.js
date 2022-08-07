import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import TextArea from "./TextArea";
import Loader from "./loader";

const StyledContactForm = styled.section`
  width: 100%;
  display: flex;
  min-height: 500px;
  flex-direction: column;
  justify-content: center;
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
  .text {
    width: 100%;
    max-width: 600px;
    text-align: center;
    font-size: 20px;
    margin: 0 auto;
    padding-top: 10px;
  }
`;

const Error = styled.p`
  font-size: 16px;
  width: 100%;
  height: 20px;
  color: red;
`;

function ContactForm({ productId }) {
  const form = useRef();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [formErrors, setFormErros] = useState({
    name: "",
    mail: "",
    message: "",
  });

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (checkValidity()) {
      setLoading(true);
      try {
        const response = await emailjs.sendForm(
          process.env.REACT_APP_EMAILJS_SERVICE,
          process.env.REACT_APP_EMAILJS_TEMPLATE,
          form.current,
          process.env.REACT_APP_EMAILJS_KEY
        );
        console.log(response);
        if (response.status === 200) {
          setSent(true);
        } else {
          throw new Error("Failed to send email");
        }
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    }
  };

  const checkValidity = () => {
    const errors = {};
    let formIsValid = true;
    if (!name) {
      formIsValid = false;
      errors.name = "Veuillez entrer votre nom.";
    }

    if (!mail) {
      formIsValid = false;
      errors.mail = "Veuillez entrer votre email.";
    }

    if (mail) {
      if (!mail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
        formIsValid = false;
        errors.mail = "Veuillez entrer un email valide.";
      }
    }

    if (!message) {
      formIsValid = false;
      errors.message = "Veuillez entrer votre message";
    }

    setFormErros(errors);
    return formIsValid;
  };

  return (
    <StyledContactForm>
      {loading && <Loader />}
      {sent && !loading && (
        <p className="text">
          {" "}
          Votre email a été envoyé, nous vous contacterons rapidement.
        </p>
      )}
      {!sent && !loading && (
        <>
          <p className="text">
            Vous souhaitez nous contacter au sujet de ce bien ? Remplissez le
            formulaire ci-dessous et nous vous répondrons rapidement.
          </p>
          <form ref={form} onSubmit={handleSendEmail}>
            <Input
              type={"text"}
              placeholder={"Votre nom"}
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Input>
            <Error>{formErrors.name}</Error>
            <Input
              type={"email"}
              placeholder={"Email: example@email.com"}
              name="mail"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            ></Input>
            <Error>{formErrors.mail}</Error>
            <TextArea
              placeholder="Ajoutez un message ici"
              rows={5}
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></TextArea>
            <Error>{formErrors.message}</Error>
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
        </>
      )}
    </StyledContactForm>
  );
}

export default ContactForm;
