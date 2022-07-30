import { Outlet, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../features/user";
import styled from "styled-components";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;

  img {
    height: 50px;
    width: 50px;
    object-fit: cover;
  }

  nav {
    display: flex;
    gap: 1px;
    background-color: green;

    a,
    button {
      background-color: white;
      width: 100px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;

      p {
        color: green;
      }
    }

    button {
      background-color: green;
      border: none;
      p {
        color: white;
      }
    }
  }
`;

function Layout() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userActions.logout());
  };

  return (
    <>
      <StyledHeader>
        <img
          alt="logo"
          src="https://seeklogo.com/images/G/greenhouse-construction-building-logo-48938B0951-seeklogo.com.png"
        />
        <nav>
          <Link to="/">
            <p>Accueil</p>
          </Link>
          <Link to="/products">
            <p>Produits</p>
          </Link>
          <Link to={"/contact"}>
            <p>Contact</p>
          </Link>
          {user && (
            <Link to={"/dashboard"}>
              <p>Dashboard</p>
            </Link>
          )}
          {user && (
            <button onClick={() => handleLogout()}>
              <p>Logout</p>
            </button>
          )}
        </nav>
      </StyledHeader>
      <Outlet />
    </>
  );
}

export default Layout;
