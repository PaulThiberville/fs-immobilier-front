import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCancel } from "@fortawesome/free-solid-svg-icons";
import { typesActions } from "../features/types";
import { Helmet } from "react-helmet";
import Button from "../components/Button";
import Input from "../components/Input";

const StyledCreateCategory = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
  form {
    margin: 30px 0;
    background-color: white;
    padding: 30px;
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    div {
      display: flex;
      gap: 10px;
      width: 100%;
      justify-content: center;
    }
  }
`;

function CreateType() {
  const user = useSelector((state) => state.user.value);
  const types = useSelector((state) => state.types.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [type, setType] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });

  useEffect(() => {
    dispatch(typesActions.getTypes());
  }, []);

  const handleCreateType = (e) => {
    e.preventDefault();
    if (inputValidity()) {
      dispatch(typesActions.addType({ user, type }));
      navigate("/dashboard");
    }
  };

  const inputValidity = () => {
    let valid = true;
    if (type === "") valid = false;
    types?.forEach((aType) => {
      if (aType.value.toLowerCase() === type.toLowerCase()) valid = false;
    });
    return valid;
  };

  return (
    <StyledCreateCategory>
      <Helmet>
        <title>FS Immobilier - Ajouter un type de bien </title>
        <meta name="description" content="Ajouter un type de bien" />
      </Helmet>
      <form>
        <Input
          type={"text"}
          onChange={(e) => setType(e.target.value)}
          placeholder={"Nouveau Type"}
          value={type}
        />
        <p></p>
        <div>
          <Button
            onClick={(e) => {
              handleCreateType(e);
            }}
          >
            <FontAwesomeIcon icon={faCheck} />
          </Button>
          <Button
            onClick={(e) => {
              navigate("/dashboard");
            }}
          >
            <FontAwesomeIcon icon={faCancel} />
          </Button>
        </div>
      </form>
    </StyledCreateCategory>
  );
}

export default CreateType;
