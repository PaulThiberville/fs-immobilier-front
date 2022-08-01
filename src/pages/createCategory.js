import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCancel } from "@fortawesome/free-solid-svg-icons";
import { categoriesActions } from "../features/cotegories";

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

function CreateCategory() {
  const user = useSelector((state) => state.user.value);
  const categories = useSelector((state) => state.categories.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });

  useEffect(() => {
    dispatch(categoriesActions.getCategories(user));
  }, []);

  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (inputValidity()) {
      dispatch(categoriesActions.addCategory({ user, category }));
      navigate("/dashboard");
    }
  };

  const inputValidity = () => {
    let valid = true;
    if (category === "") valid = false;
    categories?.forEach((cat) => {
      if (cat.value.toLowerCase() === category.toLowerCase()) valid = false;
    });
    return valid;
  };

  return (
    <StyledCreateCategory>
      <h1>Créer une catégorie :</h1>
      <form>
        <label>
          Nouvelle Catégorie:
          <input
            type={"text"}
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          />
        </label>
        <p></p>
        <div>
          <button
            onClick={(e) => {
              handleCreateCategory(e);
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

export default CreateCategory;
