import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../features/user";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Button from "../components/Button";
import Input from "../components/Input";
import styled from "styled-components";

const StyledLogin = styled.main`
  form {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    padding: 30px;
    margin: auto;
    gap: 10px;
  }
`;

function Login() {
  const user = useSelector((state) => state.user.value);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    dispatch(userActions.login({ email, password }));
  };

  return (
    <StyledLogin>
      <Helmet>
        <title>FS Immobilier - Connexion </title>
        <meta name="description" content="Se connecter" />
      </Helmet>
      <form>
        <Input
          type={"text"}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={"Email"}
          value={email}
        />
        <Input
          type={"password"}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={"Mot de passe"}
          value={password}
        />
        <Button
          onClick={(e) => {
            handleLogin(e);
          }}
        >
          Login
        </Button>
      </form>
    </StyledLogin>
  );
}

export default Login;
