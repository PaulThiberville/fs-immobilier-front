import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCancel } from "@fortawesome/free-solid-svg-icons";
import { productsActions } from "../features/products";
import { categoriesActions } from "../features/cotegories";

const StyledEditProduct = styled.main`
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

      input,
      select,
      textarea {
        width: 100%;
        border: none;
        border-bottom: 1px solid green;
      }

      input,
      select {
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

function EditProduct() {
  const { id } = useParams();
  const user = useSelector((state) => state.user.value);
  const product = useSelector((state) => state.products.value[0]);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const categories = useSelector((state) => state.categories.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
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
    dispatch(productsActions.setProduct({ user, productId: id }));
  }, []);

  useEffect(() => {
    setType(product.type);
    setCategory(product.category);
    setTitle(product.title);
    setDescription(product.description);
    setPrice(product.price);
    setCity(product.city);
    setSurface(product.surface);
    setRooms(product.rooms);
  }, [product]);

  const handleEditProduct = (e) => {
    e.preventDefault();
    if (inputValidity() && product) {
      dispatch(
        productsActions.editProduct({
          user,
          product: {
            type,
            category,
            title,
            description,
            price,
            city,
            surface,
            rooms,
          },
          productId: product._id,
        })
      );
      navigate("/dashboard");
    }
  };

  const inputValidity = () => {
    if (title === "") return false;
    if (type === "") return false;
    if (category === "") return false;
    if (description === "") return false;
    if (price === 0) return false;
    if (city === "") return false;
    if (surface === 0) return false;
    if (rooms === 0) return false;
    return true;
  };

  if (error) return <p>Error: {error}</p>;
  if (loading) return <p>Loading...</p>;
  if (product)
    return (
      <StyledEditProduct>
        <h1>Editer un produit :</h1>
        <form>
          <label>
            Type:
            <select onChange={(e) => setType(e.target.value)} value={type}>
              <option value={"buy"}>Achat</option>
              <option value={"rent"}>Location</option>
            </select>
          </label>
          <label>
            Categorie:
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value={""}>--Choisir--</option>
              {categories?.map((cat) => {
                return (
                  <option key={cat._id} value={cat.value}>
                    {cat.value}
                  </option>
                );
              })}
            </select>
          </label>
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
                handleEditProduct(e);
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
      </StyledEditProduct>
    );
}

export default EditProduct;
