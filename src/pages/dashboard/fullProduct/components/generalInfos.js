import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../../../components/Input";
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../../../../features/product";
import { Form } from "../../../../components/form";
import { checkIsEmail } from "../../../../utils/checkIsEmail";
import Select from "../../../../components/Select";
import Button from "../../../../components/Button";
import { customFetch } from "../../../../utils/customFetch";
import Loader from "../../../../components/loader";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledGeneralInfos = styled.div``;

const Buttons = styled.div`
  display: flex;
  width: max-content;
  gap: 8px;
  margin-bottom: 32px;
  margin-right: 32px;
  margin-left: auto;
`;

export const GeneralInfos = () => {
  const { id } = useParams();
  const user = useSelector(state => state.user.value);
  const {
    value: product,
    loading,
    error,
  } = useSelector(state => state.product);
  const [generalInfos, setGeneralInfos] = useState({
    name: "",
    email: "",
    status: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    dispatch(productActions.getProduct(id));
  }, []);

  useEffect(() => {
    if (product?.name && product?.email) {
      setGeneralInfos({
        name: product.name,
        email: product.email,
        status: product.status,
      });
    }
  }, [product]);

  const handleNameChanged = e => {
    if (e.target.value.length < 3) {
      setGeneralInfos({ ...generalInfos, name: e.target.value });
      return setErrors({
        ...errors,
        name: "Doit être superieur à 3 caracteres",
      });
    }
    setGeneralInfos({ ...generalInfos, name: e.target.value });
    setErrors({ ...errors, name: "" });
  };

  const handleEmailChanged = e => {
    if (!checkIsEmail(e.target.value)) {
      setGeneralInfos({ ...generalInfos, email: e.target.value });
      return setErrors({
        ...errors,
        name: "Inserez un email valide",
      });
    }
    setGeneralInfos({ ...generalInfos, email: e.target.value });
    setErrors({ ...errors, email: "" });
  };

  const handleStatusChanged = e => {
    setGeneralInfos({ ...generalInfos, status: e.target.value });
  };

  const checkValidity = () => {
    let valid = true;
    Object.values(errors).forEach(error => {
      if (error) valid = false;
    });
    return valid;
  };

  const handleSave = async () => {
    if (checkValidity()) {
      const response = await customFetch({
        route: "/product/" + id,
        verb: "PUT",
        data: generalInfos,
        token: user.token,
      });
      dispatch(productActions.getProduct(id));
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Voulez-vous supprimer ce bien ?")) {
      const response = await customFetch({
        route: "/product/" + id,
        verb: "DELETE",
        token: user.token,
      });
      if (!response.data.error) navigate("/dashboard/");
    }
  };

  return (
    <StyledGeneralInfos>
      {loading && <Loader />}
      {!loading && (
        <>
          <Form>
            <Input
              title="Nom"
              type="text"
              value={generalInfos.name}
              onChange={e => handleNameChanged(e)}
              error={errors.name}
            />
            <Input
              title="Email"
              type="text"
              value={generalInfos.email}
              onChange={e => handleEmailChanged(e)}
              error={errors.email}
            />
            <Select
              title="Status"
              value={generalInfos.status}
              onChange={e => handleStatusChanged(e)}
            >
              <option value="pending">Pending</option>
              <option value="hidden">Hidden</option>
              <option value="visible">Visible</option>
            </Select>
          </Form>
          <Buttons>
            <Button
              disabled={loading}
              onClick={async () => await handleDelete()}
            >
              Supprimer
            </Button>
            <Button disabled={loading} onClick={async () => await handleSave()}>
              Sauvegarder
            </Button>
          </Buttons>
        </>
      )}
    </StyledGeneralInfos>
  );
};
