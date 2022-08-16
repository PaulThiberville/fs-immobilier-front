import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ProductPreview from "../components/productPreview";
import { typesActions } from "../features/types";
import { productsActions } from "../features/products";
import Search from "../components/search";
import Loader from "./loader";

const StyledProducts = styled.div`
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

    .loadMore {
      color: green;
      background-color: transparent;
      margin: 30px 0;
      padding: 10px;
      border: none;
      width: 100%;
      text-align: center;
      font-size: 18px;
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
`;

const NothingFound = styled.p`
  width: max-content;
  padding: 50px;
  margin: auto;
`;

function Products({ category }) {
  const products = useSelector(state => state.products.value);
  const full = useSelector(state => state.products.full);
  const loading = useSelector(state => state.products.loading);
  const error = useSelector(state => state.products.error);
  const types = useSelector(state => state.types.value);
  const [type, setType] = useState("");
  const [options, setOptions] = useState();
  const dispatch = useDispatch();

  const handleLoadMoreProducts = () => {
    dispatch(productsActions.getMoreProducts(options));
  };

  return (
    <StyledProducts>
      <div className="container">
        <Search category={category} setOptions={() => setOptions} />
        {loading && <Loader />}
        {products && !loading && (
          <>
            <section className="products">
              {products[0] ? (
                products.map(product => {
                  return <ProductPreview key={product._id} product={product} />;
                })
              ) : (
                <NothingFound>Aucun bien n'a été trouvé</NothingFound>
              )}
            </section>
            <button
              className={"loadMore"}
              onClick={() => handleLoadMoreProducts()}
              hidden={full}
            >
              Voir plus
            </button>
          </>
        )}
      </div>
    </StyledProducts>
  );
}

export default Products;
