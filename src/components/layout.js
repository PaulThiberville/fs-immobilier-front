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

  img {
    height: 50px;
    width: 50px;
    object-fit: cover;
  }

  nav {
    display: flex;
    a {
      width: 100px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;

      p {
        color: green;
      }
    }
  }
`;

function Layout() {
  const user = useSelector((state) => state.user.value);
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
