import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { productsActions } from "../features/products";

const StyledDashboardSearch = styled.div`
  padding: 10px;
  background-color: white;
  form {
    display: flex;
    align-items: center;
    gap: 10px;
    input {
      flex-grow: 1;
      height: 40px;
    }
  }
`;

export const DashboardSearch = () => {
  const [id, setId] = useState("");
  const dispatch = useDispatch();

  const handleSearch = e => {
    e.preventDefault();
    dispatch(productsActions.getProducts({ id }));
  };

  return (
    <StyledDashboardSearch>
      <form>
        <Input
          type={"text"}
          placeholder={"Product Id (example : 0039110028)"}
          value={id}
          onChange={e => setId(e.target.value)}
        />
        <Button onClick={e => handleSearch(e)}>Search</Button>
      </form>
    </StyledDashboardSearch>
  );
};
