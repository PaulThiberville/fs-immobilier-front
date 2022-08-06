import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCancel } from "@fortawesome/free-solid-svg-icons";
import { productsActions } from "../features/products";
import { typesActions } from "../features/types";
import Loader from "../components/loader";
import { Helmet } from "react-helmet";
import Button from "../components/Button";
import Select from "../components/Select";
import TextArea from "../components/TextArea";
import Input from "../components/Input";

const StyledCreateProduct = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
  min-height: 100%;
  h1 {
    margin: 30px;
  }

  form {
    background-color: white;
    margin: 30px 0;
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

function CreateProduct() {
  const user = useSelector((state) => state.user.value);
  const loading = useSelector((state) => state.types.loading);
  const products = useSelector((state) => state.products.value);
  const types = useSelector((state) => state.types.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [category, setCategory] = useState("buy");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [city, setCity] = useState("");
  const [surface, setSurface] = useState(0);
  const [rooms, setRooms] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });

  useEffect(() => {
    dispatch(typesActions.getTypes());
  }, []);

  useEffect(() => {
    if (complete) {
      navigate("/dashboard");
    }
  }, [products]);

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (inputValidity()) {
      dispatch(
        productsActions.addProduct({
          user,
          product: {
            type,
            category,
            description,
            price,
            city,
            surface,
            rooms,
          },
        })
      );
      setComplete(true);
    }
  };

  const inputValidity = () => {
    if (type === "") return false;
    if (category === "") return false;
    if (description === "") return false;
    if (price === 0) return false;
    if (city === "") return false;
    if (surface === 0) return false;
    if (rooms === 0) return false;
    return true;
  };

  return (
    <StyledCreateProduct>
      <Helmet>
        <title>FS Immobilier - Ajouter un bien </title>
        <meta name="description" content="Ajouter un bien" />
      </Helmet>
      {loading === true && <Loader />}
      {loading === false && (
        <form>
          <Select onChange={(e) => setCategory(e.target.value)} value={type}>
            <option value={""}>--Categorie--</option>
            <option value={"buy"}>Achat</option>
            <option value={"rent"}>Location</option>
          </Select>
          <p></p>
          <Select onChange={(e) => setType(e.target.value)} value={type}>
            <option value={""}>--Type--</option>
            {types?.map((aType) => {
              return (
                <option key={aType._id} value={aType.value}>
                  {aType.value}
                </option>
              );
            })}
          </Select>
          <p></p>
          <TextArea
            rows={5}
            placeholder={"Description"}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <p></p>
          <Input
            type={"number"}
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            placeholder={"Prix"}
          />
          <p></p>
          <Input
            type={"text"}
            onChange={(e) => setCity(e.target.value)}
            value={city}
            placeholder={"Ville"}
          />
          <p></p>
          <Input
            type={"number"}
            onChange={(e) => setSurface(e.target.value)}
            value={surface}
            placeholder={"Surface"}
          />
          <p></p>
          <Input
            type={"number"}
            onChange={(e) => setRooms(e.target.value)}
            value={rooms}
            placeholder={"Pieces"}
          />
          <p></p>
          <div>
            <Button
              onClick={(e) => {
                handleCreateProduct(e);
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
      )}
    </StyledCreateProduct>
  );
}

export default CreateProduct;
