import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { userActions } from "../features/user";
import { productsActions } from "../features/products";
import styled from "styled-components";
import DashboardProduct from "../components/dashboardProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import Loader from "../components/loader";

const StyledDashboard = styled.main`
  min-height: 100%;
  width: 100%;
  display: flex;
  gap: 10px;
  padding: 10px 0;

  nav {
    display: flex;
    flex-direction: column;
    gap: 10px;

    a,
    button {
      border: none;
      height: 50px;
      width: 300px;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-left: 10px;
      gap: 10px;

      * {
        color: green;
        font-weight: bold;
        font-size: 16px;
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

  section {
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

function Dashboard() {
  const user = useSelector((state) => state.user.value);
  const products = useSelector((state) => state.products.value);
  const error = useSelector((state) => state.products.error);
  const loading = useSelector((state) => state.products.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(userActions.logout());
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });

  useEffect(() => {
    if (user) {
      dispatch(productsActions.getProducts());
    }
  }, []);

  return (
    <StyledDashboard>
      <nav>
        <Link to={"/create/product"}>
          <FontAwesomeIcon icon={faAdd} />
          <p>Ajouter un bien</p>
        </Link>
        <Link to={"/create/type"}>
          <FontAwesomeIcon icon={faAdd} />
          <p>Ajouter un type de bien</p>
        </Link>
        <button onClick={() => handleLogout()}>
          <FontAwesomeIcon icon={faPowerOff} />
          <p>Se deconnecter</p>
        </button>
      </nav>
      {loading === true && <Loader />}
      {error === true && <p>Error: {error}</p>}
      {products && loading === false && (
        <section>
          {products.map((product) => {
            return <DashboardProduct key={product._id} product={product} />;
          })}
        </section>
      )}
    </StyledDashboard>
  );
}

export default Dashboard;
