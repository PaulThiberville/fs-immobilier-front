import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../../../components/Input";
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../../../../features/product";
import { Form } from "../../../../components/form";

export const ProductInfos = () => {
  const { id } = useParams();
  const {
    value: product,
    loading,
    error,
  } = useSelector(state => state.product);
  const [productInfos, setProductInfos] = useState({ name: "", email: "" });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productActions.getProduct(id));
  }, []);

  useEffect(() => {
    if (product?._id) {
      setProductInfos({ city: product.city, price: product.price });
    }
  }, [product]);
  return (
    <Form>
      {productInfos.city && <Input title="Ville" value={productInfos.city} />}
      {productInfos.price && <Input title="Prix" value={productInfos.price} />}
    </Form>
  );
};
