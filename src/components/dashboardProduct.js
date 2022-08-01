import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faImage } from "@fortawesome/free-solid-svg-icons";
import { productsActions } from "../features/products";

const StyledDashboardProduct = styled.article`
  height: 50px;
  width: 100%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  .infos {
    display: flex;
    flex-grow: 1;
    align-items: center;
    h2,
    p {
      width: 50%;
    }
  }

  .actions {
    display: flex;
    align-items: center;
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
      <div className="infos">
        <h2>{product.title}</h2>
        <p>{product.city}</p>
      </div>
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
