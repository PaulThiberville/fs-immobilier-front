import { Outlet, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useEffect } from "react";
import { userActions } from "../features/user";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 0 10px;
  img {
    height: 50px;
    width: 50px;
    object-fit: cover;
  }

  nav {
    display: flex;
    background-color: white;
    a {
      width: 100px;
      height: 70px;
      border-bottom: 5px solid white;
      display: flex;
      align-items: center;
      justify-content: center;

      p {
        color: green;
      }

      &:hover {
        border-bottom: 5px solid green;
      }
    }
  }

  @media only screen and (max-width: 500px) {
    flex-direction: column;
    img {
      margin-top: 10px;
    }
    nav {
      width: 100%;
      gap: 10px;
      display: flex;
      a {
        flex-grow: 1;
      }
    }
  }
`;

function Layout() {
  const user = useSelector(state => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      const localUser = localStorage.getItem("user");
      if (localUser) dispatch(userActions.setUser(JSON.parse(localUser)));
    }
  }, []);

  return (
    <>
      <StyledHeader>
        <img
          alt="logo"
          src="https://seeklogo.com/images/G/greenhouse-construction-building-logo-48938B0951-seeklogo.com.png"
        />
        <nav>
          <Link to={"/"}>
            <p>Accueil</p>
          </Link>
          <Link to={"/buy"}>
            <p>Acheter</p>
          </Link>
          <Link to={"/rent"}>
            <p>Louer</p>
          </Link>
          <Link to={"/submit"}>
            <p>Proposer</p>
          </Link>
          {user && (
            <>
              <Link to={"/dashboard"}>
                <p>Dashboard</p>
              </Link>
            </>
          )}
        </nav>
      </StyledHeader>
      <Outlet />
    </>
  );
}

export default Layout;
