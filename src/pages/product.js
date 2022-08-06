import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ContactForm from "../components/contactForm";
import Gallery from "../components/gallery";
import { productsActions } from "../features/products";
import { Helmet } from "react-helmet";
import { productActions } from "../features/product";

const StyledProduct = styled.main`
  .product-container {
    width: 100%;
    display: flex;
    gap: 10px;
    padding: 10px;
    background-color: white;
    margin-top: 10px;
  }
  .gallery-container {
    height: 600px;
    width: 50%;
    max-width: 600px;
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
      margin: 30px 0;
    }
  }

  @media only screen and (max-width: 1024px) {
    .product-container {
      flex-direction: column;
    }

    .gallery-container {
      width: 100%;
      max-width: 100%;
    }

    .infos-container {
      width: 100%;
      .first-line {
        flex-wrap: wrap;
      }
    }
  }
  @media only screen and (max-width: 768px) {
    .gallery-container {
      height: 50vh;
    }
  }
`;

function Product() {
  const { id } = useParams();
  const product = useSelector((state) => state.product.value);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productActions.getProduct(id));
  }, []);

  if (loading === true) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (product)
    return (
      <StyledProduct>
        <Helmet>
          <title>
            {"FS Immobilier - " +
              product.city +
              " /" +
              product.surface +
              "m2 /" +
              product.price +
              " €"}
          </title>
          <meta name="description" content={product.description} />
        </Helmet>
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
