import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledProductPreview = styled.article`
  padding: 10px;
  width: 33.333%;
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;
  .container {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    img {
      height: 300px;
      width: 100%;
      object-fit: cover;
    }
    .infos {
      padding: 10px;
      gap: 10px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      width: 100%;
    }
  }
`;

function ProductPreview({ product }) {
  return (
    <StyledProductPreview>
      <div className="container">
        <img src={product.images[0].url} alt={product.title} />
        <Link className="infos" to={"/product/" + product._id}>
          <p>{product.city}</p>
          <p>{product.rooms + " pieces"}</p>
          <p>{product.price + " €"}</p>
          <p>{product.description}</p>
        </Link>
      </div>
    </StyledProductPreview>
  );
}

export default ProductPreview;
