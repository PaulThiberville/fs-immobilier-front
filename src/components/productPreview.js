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
`;

function ProductPreview({ product }) {
  return (
    <StyledProductPreview>
      <div className="container">
        <div className="gallery-container">
          <Gallery images={product.images} type={"full"} />
        </div>
        <Link className="infos" to={"/product/" + product._id}>
          <p>{product.city}</p>
          <p>{product.rooms + " pieces"}</p>
          <p>{product.price + " €"}</p>
          <p className="description">{product.description}</p>
        </Link>
      </div>
    </StyledProductPreview>
  );
}

export default ProductPreview;
