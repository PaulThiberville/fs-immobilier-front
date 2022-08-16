import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Gallery from "./gallery";

const fadeIn = keyframes`
  from {
    opacity:0;
  }

  to {
    opacity:1;
  }
`;

const StyledProductPreview = styled.article`
  padding: 10px;
  width: 33.333%;
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 0.5s linear;
  .container {
    background-color: white;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    .gallery-container {
      height: 300px;
    }
    .infos {
      padding: 10px;
      gap: 10px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      width: 100%;
      strong {
        font-weight: bold;
      }
      h2 {
        font-size: 18px;
        font-weight: bold;
      }
      .description {
        height: 100px;
        width: 100%;
        display: inline-block;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: pre-wrap;
      }
    }
  }

  @media only screen and (max-width: 1024px) {
    width: 50%;
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

function ProductPreview({ product }) {
  return (
    <StyledProductPreview>
      <div className="container">
        <div className="gallery-container">
          <Gallery images={product.images} type={"full"} />
        </div>
        <Link className="infos" to={"/product/" + product._id}>
          <strong>{`${product.city} | ${product.rooms + " pieces"} | ${
            product.surface + " m²"
          }`}</strong>
          <h2>{product.price + " €"}</h2>
          <p className="description">{product.description}</p>
        </Link>
      </div>
    </StyledProductPreview>
  );
}

export default ProductPreview;
