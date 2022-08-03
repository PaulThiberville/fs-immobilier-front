import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const StyledProduct = styled.main`
  display: flex;
  flex-direction: column;
  gap: 10px;
  img {
    height: 300px;
    width: 300px;
    object-fit: cover;
  }
`;

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          process.env.REACT_APP_API_URL + "/product/" + id
        );
        if (response.status === 200) {
          setProduct(await response.json());
        } else {
          throw new error("Bad status :", response.status);
        }
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    getProduct();
  }, []);

  if (loading === true) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (product)
    return (
      <StyledProduct>
        <h2>{product.price}</h2>
        <img src={product.images[0].url} alt={product.title} />
        <p>{product.city}</p>
        <p>{product.surface + " m2"}</p>
        <p>{product.rooms + " pieces"}</p>
        <p>{product.description}</p>
        <p>{product.createdAt}</p>
      </StyledProduct>
    );
}

export default Product;
