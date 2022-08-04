import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { productsActions } from "../features/products";

const StyledContactForm = styled.section`
  width: 100%;
  max-width: 500px;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    input,
    textarea,
    button {
      border: none;
      background-color: white;
      padding: 10px;
      line-height: 30px;
    }

    button {
      display: flex;
      gap: 10px;
      align-items: center;
      justify-content: center;
    }
  }

  p {
    font-size: 22px;
    color: white;
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
        formulaire ci-dessous et nous vous contacterons.
      </p>
      <form ref={form} onSubmit={handleSendEmail}>
        <input type={"test"} placeholder={"Votre nom"} name="name"></input>
        <p></p>
        <input
          type={"email"}
          placeholder={"Email: example@email.com"}
          name="mail"
        ></input>
        <p></p>
        <textarea
          placeholder="Ajoutez un message ici"
          rows={5}
          name="message"
        ></textarea>
        <p></p>
        <input
          type={"text"}
          hidden={true}
          name="productId"
          value={productId}
          readOnly={true}
        ></input>
        <button onClick={(e) => handleSendEmail(e)}>
          <FontAwesomeIcon icon={faPaperPlane} />
          Envoyer
        </button>
      </form>
    </StyledContactForm>
  );
}

export default ContactForm;
