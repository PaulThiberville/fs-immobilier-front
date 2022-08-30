import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";
import { userActions } from "../../features/user";
import { ProductTable } from "./components/productsTable";

const StyledDashboard = styled.main`
  width: 100%;
  display: flex;
  gap: 10px;
  padding: 10px;

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
      border-bottom: 1px solid green;
      border-left: 5px solid green;

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
`;

function Dashboard() {
  const user = useSelector(state => state.user.value);
  const products = useSelector(state => state.products.value);
  const error = useSelector(state => state.products.error);
  const loading = useSelector(state => state.products.loading);
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

  return (
    <StyledDashboard>
      <Helmet>
        <title>FS Immobilier - Dashboard </title>
        <meta name="description" content="Dashboard" />
      </Helmet>
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
      <ProductTable />
    </StyledDashboard>
  );
}

export default Dashboard;
