import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ContactForm from "../components/contactForm";
import Gallery from "../components/gallery";
import { productsActions } from "../features/products";

const StyledProduct = styled.main`
  background-color: green;
  .product-container {
    width: 100%auto;
    display: flex;
    gap: 10px;
    background-color: white;
    padding: 10px;
  }
  .gallery-container {
    height: 600px;
    width: 50%;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
  .infos-container {
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

function Product() {
  const { id } = useParams();
  const product = useSelector((state) => state.products.value[0]);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsActions.getProduct(id));
  }, []);

  if (loading === true) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (product)
    return (
      <StyledProduct>
        <section className="product-container">
          <div className="gallery-container">
            <Gallery images={product.images} type={"full"} />
          </div>
          <div className="infos-container">
            <h2>{product.price + " €"}</h2>
            <p>{product.city}</p>
            <p>{product.surface + " m2"}</p>
            <p>{product.rooms + " pieces"}</p>
            <p>{product.description}</p>
            <p>{product.createdAt}</p>
          </div>
        </section>
        <ContactForm productId={product._id} />
      </StyledProduct>
    );
}

export default Product;
