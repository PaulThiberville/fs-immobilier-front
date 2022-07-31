import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { userActions } from "../features/user";
import { productsActions } from "../features/products";
import styled from "styled-components";
import DashboardProduct from "../components/dashboardProduct";

const StyledDashboard = styled.main`
  height: 100%;
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
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      padding-left: 10px;

      p {
        color: green;
        font-weight: bold;
      }

      &:hover {
        cursor: pointer;
        background-color: green;
        p {
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
      dispatch(productsActions.setProducts());
    }
  }, []);

  return (
    <StyledDashboard>
      <nav>
        <Link to={"/create"}>
          <p>Create</p>
        </Link>
        <button onClick={() => handleLogout()}>
          <p>Logout</p>
        </button>
      </nav>
      <section>
        {products.map((product) => {
          return <DashboardProduct key={product._id} product={product} />;
        })}
      </section>
    </StyledDashboard>
  );
}

export default Dashboard;
