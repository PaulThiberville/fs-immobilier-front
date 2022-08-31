import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../../../components/Input";
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../../../../features/product";
import { Form } from "../../../../components/form";

export const UserInfos = () => {
  const { id } = useParams();
  const {
    value: product,
    loading,
    error,
  } = useSelector(state => state.product);
  const [userInfos, setUserInfos] = useState({ name: "", email: "" });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productActions.getProduct(id));
  }, []);

  useEffect(() => {
    if (product?.name && product?.email) {
      setUserInfos({ name: product.name, email: product.email });
    }
  }, [product]);
  return (
    <Form>
      {userInfos.name && <Input title="Nom" value={userInfos.name} />}
      {userInfos.email && <Input title="Email" value={userInfos.email} />}
    </Form>
  );
};
