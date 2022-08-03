import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ProductPreview from "../components/productPreview";
import { typesActions } from "../features/types";
import { productsActions } from "../features/products";
import Search from "../components/search";

const StyledBuy = styled.main`
  width: 100%;
  display: flex;
  nav {
    width: 200px;
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    padding-right: 10px;
    gap: 10px;
    button {
      width: 100%;
      background-color: transparent;
      border: none;
      text-align: start;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .container {
    width: 100%;
    .products {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }
  }
`;

function Buy() {
  const products = useSelector((state) => state.products.value);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const types = useSelector((state) => state.types.value);
  const [type, setType] = useState("");
  const dispatch = useDispatch();

  return (
    <StyledBuy>
      <div className="container">
        <Search category={"buy"} />
        {loading && <p>Loading...</p>}
        {products && !loading && (
          <section className="products">
            {products?.map((product) => {
              return <ProductPreview key={product._id} product={product} />;
            })}
          </section>
        )}
      </div>
    </StyledBuy>
  );
}

export default Buy;