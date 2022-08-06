import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCancel } from "@fortawesome/free-solid-svg-icons";
import { typesActions } from "../features/types";
import Loader from "../components/loader";
import { Helmet } from "react-helmet";
import Button from "../components/Button";
import Select from "../components/Select";
import TextArea from "../components/TextArea";
import Input from "../components/Input";
import { productActions } from "../features/product";

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

function EditProduct() {
  const { id } = useParams();
  const user = useSelector((state) => state.user.value);
  const product = useSelector((state) => state.product.value);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);
  const types = useSelector((state) => state.types.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
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
    dispatch(productActions.getProduct(id));
    dispatch(typesActions.getTypes());
  }, []);

  useEffect(() => {
    if (product) {
      setType(product.type);
      setCategory(product.category);
      setDescription(product.description);
      setPrice(product.price);
      setCity(product.city);
      setSurface(product.surface);
      setRooms(product.rooms);
    }
  }, [product]);

  const handleEditProduct = (e) => {
    e.preventDefault();
    if (inputValidity() && product) {
      dispatch(
        productActions.editProduct({
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
          productId: product._id,
        })
      );
      navigate("/dashboard");
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

  if (error) return <p>Error: {error}</p>;
  if (loading) return <Loader />;
  if (product)
    return (
      <StyledEditProduct>
        <Helmet>
          <title>FS Immobilier - Editer le produit </title>
          <meta name="description" content="Editer le produit" />
        </Helmet>
        <form>
          <Select onChange={(e) => setCategory(e.target.value)} value={type}>
            <option value={"buy"}>Achat</option>
            <option value={"rent"}>Location</option>
            <option value="">--Categorie--</option>
          </Select>
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
          Description:
          <TextArea
            type={"text"}
            rows={5}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder={"Description"}
          />
          <p></p>
          Prix:
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
                handleEditProduct(e);
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
      </StyledEditProduct>
    );
}

export default EditProduct;
