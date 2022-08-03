import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCancel } from "@fortawesome/free-solid-svg-icons";
import { typesActions } from "../features/types";

const StyledCreateCategory = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
  h1 {
    margin: 30px;
  }
  form {
    padding: 30px;
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    label {
      width: 100%;
      display: flex;
      flex-direction: column;

      input {
        width: 100%;
        border: none;
        border-bottom: 1px solid green;
      }

      input {
        height: 30px;
      }
    }
    p {
      height: 30px;
    }
    div {
      display: flex;
      gap: 10px;
      width: 100%;
      justify-content: center;
      button {
        background-color: white;
        border: none;
        height: 30px;
        width: 30px;
        display: flex;
        align-items: center;
        justify-content: center;

        * {
          color: green;
        }

        &:hover {
          cursor: pointer;
          background-color: green;
          * {
            color: white;
          }
        }
      }
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
      <h1>Créer un type de bien :</h1>
      <form>
        <label>
          Nouveau type:
          <input
            type={"text"}
            onChange={(e) => setType(e.target.value)}
            value={type}
          />
        </label>
        <p></p>
        <div>
          <button
            onClick={(e) => {
              handleCreateType(e);
            }}
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button
            onClick={(e) => {
              navigate("/dashboard");
            }}
          >
            <FontAwesomeIcon icon={faCancel} />
          </button>
        </div>
      </form>
    </StyledCreateCategory>
  );
}

export default CreateType;
