import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faImage } from "@fortawesome/free-solid-svg-icons";
import { productsActions } from "../features/products";

const StyledDashboardProduct = styled.article`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom: 1px solid green;
  border-left: 5px solid green;
  .actions {
    display: flex;
    gap: 10px;
    a,
    button {
      height: 30px;
      width: 30px;
      border: none;
      background-color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      * {
        color: green;
      }
      &:hover {
        cursor: pointer;
        background-color: green;
        * {
          color: white;
        }
      }
    }
  }
`;

function DashboardProduct({ product }) {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const handleDeleteProduct = () => {
    dispatch(productsActions.removeProduct({ user, productId: product._id }));
  };

  return (
    <StyledDashboardProduct>
      <h1>{product._id}</h1>
      <p>{product.city}</p>
      <div className="actions">
        <Link to={"/edit/product/" + product._id}>
          <FontAwesomeIcon icon={faPen} />
        </Link>
        <Link to={"/edit/images/" + product._id}>
          <FontAwesomeIcon icon={faImage} />
        </Link>
        <button onClick={() => handleDeleteProduct()}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </StyledDashboardProduct>
  );
}

export default DashboardProduct;
