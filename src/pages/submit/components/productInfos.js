import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form } from "../../../components/form";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import TextArea from "../../../components/TextArea";
import { submitActions } from "../../../features/submit";
import { productsActions } from "../../../features/products";
import { useEffect } from "react";
import { typesActions } from "../../../features/types";
import { Pop } from "../../../components/pop";

export default function ProductInfos() {
  const {
    category,
    type,
    description,
    price,
    city,
    surface,
    rooms,
    bedrooms,
    isProductValid,
  } = useSelector(state => state.submit);
  const types = useSelector(state => state.types.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateProduct = e => {
    e.preventDefault();
    if (isProductValid == true) {
      dispatch(
        productsActions.addProduct({
          type,
          category,
          description,
          price,
          city,
          surface,
          rooms,
          bedrooms,
        })
      );
      navigate("/dashboard");
    }
  };

  const handleCategoryChanged = e => {
    if (e.target.value === "")
      return dispatch(
        submitActions.setCategory({
          value: e.target.value,
          error: "Selectionnez une categorie.",
        })
      );
    dispatch(submitActions.setCategory({ value: e.target.value, error: "" }));
  };

  const handleTypeChanged = e => {
    if (e.target.value === "")
      return dispatch(
        submitActions.setType({
          value: e.target.value,
          error: "Selectionnez un type.",
        })
      );
    dispatch(submitActions.setType({ value: e.target.value, error: "" }));
  };

  const handleDescriptionChanged = e => {
    if (e.target.value.length < 3)
      return dispatch(
        submitActions.setDescription({
          value: e.target.value,
          error: "Saisisez au moins 3 caracteres.",
        })
      );
    dispatch(
      submitActions.setDescription({ value: e.target.value, error: "" })
    );
  };

  const handlePriceChanged = e => {
    if (e.target.value <= 0)
      return dispatch(
        submitActions.setPrice({
          value: e.target.value,
          error: "Indiquez un prix",
        })
      );
    dispatch(submitActions.setPrice({ value: e.target.value, error: "" }));
  };

  const handleCityChanged = e => {
    if (e.target.value.length < 3)
      return dispatch(
        submitActions.setCity({
          value: e.target.value,
          error: "Saisisez au moins 3 caracteres.",
        })
      );
    dispatch(submitActions.setCity({ value: e.target.value, error: "" }));
  };

  const handleSurfaceChanged = e => {
    if (e.target.value <= 0)
      return dispatch(
        submitActions.setSurface({
          value: e.target.value,
          error: "Indiquez une surface",
        })
      );
    dispatch(submitActions.setSurface({ value: e.target.value, error: "" }));
  };

  const handleRoomsChanged = e => {
    if (e.target.value < 0)
      return dispatch(
        submitActions.setRooms({
          value: e.target.value,
          error: "Indiquez un nombre de pieces",
        })
      );
    dispatch(submitActions.setRooms({ value: e.target.value, error: "" }));
  };

  const handleBedroomsChanged = e => {
    if (e.target.value < 0)
      return dispatch(
        submitActions.setBedrooms({
          value: e.target.value,
          error: "Indiquez un nombre de chambres",
        })
      );
    dispatch(submitActions.setBedrooms({ value: e.target.value, error: "" }));
  };

  useEffect(() => {
    dispatch(typesActions.getTypes());
  }, []);

  return (
    <Pop>
      <Form>
        <Select
          title="Categorie"
          onChange={e => handleCategoryChanged(e)}
          value={category.value}
          error={category.error}
        >
          <option value={""}>--Categorie--</option>
          <option value={"buy"}>Achat</option>
          <option value={"rent"}>Location</option>
        </Select>
        <Select
          title="Type"
          onChange={e => handleTypeChanged(e)}
          value={type.value}
          error={type.error}
        >
          <option key={"default"} value={""}>
            --Type--
          </option>
          {types?.map(aType => {
            return (
              <option key={aType._id} value={aType.value}>
                {aType.value}
              </option>
            );
          })}
        </Select>
        <Input
          title="Prix"
          type={"number"}
          onChange={e => handlePriceChanged(e)}
          value={price.value}
          error={price.error}
        />
        <Input
          title="Ville"
          type={"text"}
          onChange={e => handleCityChanged(e)}
          value={city.value}
          error={city.error}
        />
        <Input
          title="Surface en m²"
          type={"number"}
          onChange={e => handleSurfaceChanged(e)}
          value={surface.value}
          error={surface.error}
        />
        <Input
          title="Nombre de pieces"
          type={"number"}
          onChange={e => handleRoomsChanged(e)}
          value={rooms.value}
          error={rooms.error}
        />
        <TextArea
          title="Description"
          rows={5}
          onChange={e => handleDescriptionChanged(e)}
          value={description.value}
          error={description.error}
        />
        <Input
          title="Nombre de chambres"
          type={"number"}
          onChange={e => handleBedroomsChanged(e)}
          value={bedrooms.value}
          error={bedrooms.error}
        />
      </Form>
    </Pop>
  );
}
