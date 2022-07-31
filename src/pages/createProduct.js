import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCancel } from "@fortawesome/free-solid-svg-icons";
import { productsActions } from "../features/products";
import { typesActions } from "../features/types";
import { categoriesActions } from "../features/cotegories";

const StyledCreateProduct = styled.main`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    margin: 30px;
  }
  form {
    padding: 30px;
    height: 100%;
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

      input,
      textarea {
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

function CreateProduct() {
  const user = useSelector((state) => state.user.value);
  const types = useSelector((state) => state.types.value);
  const categories = useSelector((state) => state.categories.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [city, setCity] = useState("");
  const [surface, setSurface] = useState(0);
  const [rooms, setRooms] = useState(0);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });

  useEffect(() => {
    dispatch(typesActions.getTypes(user));
    dispatch(categoriesActions.getCategories(user));
  }, []);

  const handleCreateProduct = (e) => {
    e.preventDefault();
    console.log("validity:", inputValidity());
    if (inputValidity()) {
      dispatch(
        productsActions.addProduct({
          user,
          product: {
            title,
            description,
            price,
            city,
            surface,
            rooms,
          },
        })
      );
      navigate("/dashboard");
    }
  };

  const inputValidity = () => {
    if (title === "") return false;
    if (description === "") return false;
    if (price === 0) return false;
    if (city === "") return false;
    if (surface === 0) return false;
    if (rooms === 0) return false;
    return true;
  };

  return (
    <StyledCreateProduct>
      {"types: " + JSON.stringify(types)}
      {"categories: " + JSON.stringify(categories)}

      <h1>Créer un produit :</h1>
      <form>
        <label>
          Titre:
          <input
            type={"text"}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <p></p>
        <label>
          Description:
          <textarea
            type={"text"}
            rows={5}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </label>
        <p></p>
        <label>
          Prix:
          <input
            type={"number"}
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </label>
        <p></p>
        <label>
          Ville:
          <input
            type={"text"}
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
        </label>
        <p></p>
        <label>
          Surface:
          <input
            type={"number"}
            onChange={(e) => setSurface(e.target.value)}
            value={surface}
          />
        </label>
        <p></p>
        <label>
          Pieces:
          <input
            type={"number"}
            onChange={(e) => setRooms(e.target.value)}
            value={rooms}
          />
        </label>
        <p></p>
        <div>
          <button
            onClick={(e) => {
              handleCreateProduct(e);
            }}
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button
            onClick={(e) => {
              handleCreateProduct();
            }}
          >
            <FontAwesomeIcon icon={faCancel} />
          </button>
        </div>
      </form>
    </StyledCreateProduct>
  );
}

export default CreateProduct;
