import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../../../components/Input";
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../../../../features/product";
import { Form } from "../../../../components/form";
import Select from "../../../../components/Select";
import { typesActions } from "../../../../features/types";
import TextArea from "../../../../components/TextArea";
import Button from "../../../../components/Button";
import styled from "styled-components";
import { customFetch } from "../../../../utils/customFetch";
import Loader from "../../../../components/loader";

const Buttons = styled.div`
  display: flex;
  width: max-content;
  gap: 8px;
  margin-bottom: 32px;
  margin-right: 32px;
  margin-left: auto;
`;

export const ProductInfos = () => {
  const { id } = useParams();
  const user = useSelector(state => state.user.value);
  const {
    value: product,
    loading,
    error,
  } = useSelector(state => state.product);
  const types = useSelector(state => state.types.value);
  const [productInfos, setProductInfos] = useState({
    category: "",
    type: "",
    city: "",
    price: 0,
    surface: 0,
    rooms: 0,
    bedrooms: 0,
    description: "",
  });
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    category: "",
    type: "",
    city: "",
    price: "",
    surface: "",
    rooms: "",
    bedrooms: "",
    description: "",
  });

  const handleCategoryChanged = e => {
    if (e.target.value === "") {
      setProductInfos({ ...productInfos, category: e.target.value });
      return setErrors({ ...errors, category: "Select a category." });
    }
    setProductInfos({ ...productInfos, category: e.target.value });
    setErrors({ ...errors, category: "" });
  };

  const handleTypeChanged = e => {
    if (e.target.value === "") {
      setProductInfos({ ...productInfos, type: e.target.value });
      return setErrors({ ...errors, type: "Select a type." });
    }
    setProductInfos({ ...productInfos, type: e.target.value });
    setErrors({ ...errors, type: "" });
  };

  const handleCityChanged = e => {
    if (e.target.value.length < 3) {
      setProductInfos({ ...productInfos, city: e.target.value });
      return setErrors({
        ...errors,
        city: "Doit être superieur à 3 caracteres",
      });
    }
    setProductInfos({ ...productInfos, city: e.target.value });
    setErrors({ ...errors, city: "" });
  };

  const handlePriceChanged = e => {
    if (e.target.value <= 0) {
      setProductInfos({ ...productInfos, price: e.target.value });
      return setErrors({ ...errors, price: "Doit être supperieur à 0." });
    }
    setProductInfos({ ...productInfos, price: e.target.value });
    setErrors({ ...errors, price: "" });
  };

  const handleSurfaceChanged = e => {
    if (e.target.value <= 0) {
      setProductInfos({ ...productInfos, surface: e.target.value });
      return setErrors({ ...errors, surface: "Doit être superieur à 0" });
    }
    setProductInfos({ ...productInfos, surface: e.target.value });
    setErrors({ ...errors, surface: "" });
  };

  const handleRoomsChanged = e => {
    if (e.target.value < 0) {
      setProductInfos({ ...productInfos, rooms: e.target.value });
      return setErrors({ ...errors, rooms: "Ne peut pas être inferieur à 0" });
    }
    setProductInfos({ ...productInfos, rooms: e.target.value });
    setErrors({ ...errors, rooms: "" });
  };

  const handleBedroomsChanged = e => {
    if (e.target.value < 0) {
      setProductInfos({ ...productInfos, bedrooms: e.target.value });
      return setErrors({
        ...errors,
        bedrooms: "Ne peut pas être inferieur à 0",
      });
    }
    setProductInfos({ ...productInfos, bedrooms: e.target.value });
    setErrors({ ...errors, bedrooms: "" });
  };

  const handleDescriptionChanged = e => {
    if (e.target.value.length < 3) {
      setProductInfos({ ...productInfos, description: e.target.value });
      return setErrors({
        ...errors,
        description: "Doit être superieur à 3 caracteres",
      });
    }
    setProductInfos({ ...productInfos, description: e.target.value });
    setErrors({ ...errors, description: "" });
  };

  useEffect(() => {
    dispatch(typesActions.getTypes());
    dispatch(productActions.getProduct(id));
  }, []);

  const handleSave = async e => {
    e.preventDefault();
    await customFetch({
      route: "/product/" + id,
      verb: "PUT",
      data: productInfos,
      token: user.token,
    });
    dispatch(productActions.getProduct(id));
  };

  useEffect(() => {
    if (product?._id) {
      setProductInfos({
        type: product.type,
        category: product.category,
        city: product.city,
        price: product.price,
        surface: product.surface,
        rooms: product.rooms,
        bedrooms: product.bedrooms,
        description: product.description,
      });
    }
  }, [product]);

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <>
          <Form>
            <Select
              title="Categorie"
              value={productInfos.category}
              onChange={e => handleCategoryChanged(e)}
              error={errors.category}
            >
              <option value={""}>--Categorie--</option>
              <option value={"buy"}>Achat</option>
              <option value={"rent"}>Location</option>
            </Select>
            <Select
              title="Type"
              value={productInfos.type}
              onChange={e => handleTypeChanged(e)}
              error={errors.type}
            >
              <option key={"default"} value={""}>
                --Type--
              </option>
              {types?.map(type => {
                return (
                  <option key={type._id} value={type.value}>
                    {type.value}
                  </option>
                );
              })}
            </Select>
            <Input
              title="Ville"
              type="text"
              value={productInfos.city}
              onChange={e => handleCityChanged(e)}
              error={errors.city}
            />
            <Input
              title="Prix"
              type="number"
              value={productInfos.price}
              onChange={e => handlePriceChanged(e)}
              error={errors.price}
            />
            <Input
              title="Surface"
              type="number"
              value={productInfos.surface}
              onChange={e => handleSurfaceChanged(e)}
              error={errors.surface}
            />
            <Input
              title="Pieces"
              type="number"
              value={productInfos.rooms}
              onChange={e => handleRoomsChanged(e)}
              error={errors.rooms}
            />
            <TextArea
              title="Description"
              value={productInfos.description}
              onChange={e => handleDescriptionChanged(e)}
              error={errors.description}
            />
            <Input
              title="Chambres"
              type="number"
              value={productInfos.bedrooms}
              onChange={e => handleBedroomsChanged(e)}
              error={errors.bedrooms}
            />
            <Buttons>
              <Button disabled={loading} onClick={e => handleSave(e)}>
                Sauvegarder
              </Button>
            </Buttons>
          </Form>
        </>
      )}
    </>
  );
};
