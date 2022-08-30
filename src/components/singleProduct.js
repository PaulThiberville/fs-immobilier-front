import styled from "styled-components";
import Gallery from "../components/gallery";

const StyledSingleProduct = styled.main`
  .product-container {
    width: 100%;
    display: flex;
    gap: 10px;
    padding: 10px;
    background-color: white;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
  .gallery-container {
    flex-shrink: 0;
    height: 600px;
    width: 100%;
    max-width: 600px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
  .infos-container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;

    .first-line {
      display: flex;
      gap: 10px;
      align-items: center;
      .info {
        font-size: 22px;
      }
      .price {
        font-size: 30px;
      }
    }

    .description {
      white-space: pre-wrap;
      flex-grow: 1;
      width: 100%;
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

function SingleProduct({ product }) {
  return (
    <StyledSingleProduct>
      <section className="product-container">
        <div className="gallery-container">
          <Gallery images={product.images} type={"full"} />
        </div>
        <div className="infos-container">
          <p className="first-line">
            <p className="info">{product.type + " | " + product.city}</p>
            <p className="info">{product.surface + " m² | "}</p>
            <p className="info">{product.rooms + " pieces"}</p>
          </p>
          <h2 className="price">{product.price + " €"}</h2>
          <p className="description">{product.description}</p>
          <p>
            Publié le :{" "}
            {new Date(product.createdAt).toLocaleDateString("fr-FR")}
          </p>
        </div>
      </section>
    </StyledSingleProduct>
  );
}

export default SingleProduct;
