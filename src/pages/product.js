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
    justify-content: space-between;

    .first-line {
      display: flex;
      justify-content: space-between;
      strong,
      p {
        font-size: 25px;
      }
      h2 {
        font-size: 30px;
      }
    }

    .description {
      white-space: pre-wrap;
      flex-grow: 1;
      overflow-y: scroll;
      margin: 30px;
    }
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
            <p className="first-line">
              <strong>{product.city}</strong>
              <p>{product.surface + " m2"}</p>
              <p>{product.rooms + " pieces"}</p>
              <h2>{product.price + " €"}</h2>
            </p>
            <p className="description">{product.description}</p>
            <p>
              Publié le :{" "}
              {new Date(product.createdAt).toLocaleDateString("fr-FR")}
            </p>
          </div>
        </section>
        <ContactForm productId={product._id} />
      </StyledProduct>
    );
}

export default Product;
