import styled from "styled-components";

const Button = styled.button`
  padding: 10px;
  background-color: white;
  border: none;
  color: green;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  gap: 10px;
  transition: color 0.2s linear;
  transition: background-color 0.2s linear;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  * {
    background-color: white;
    color: green;
    font-size: 18px;
    font-weight: bold;
    transition: color 0.2s linear;
    transition: background-color 0.2s linear;
  }

  &:hover {
    background-color: green;
    color: white;
    cursor: pointer;
    * {
      background-color: green;
      color: white;
    }
  }

  &:disabled {
    color: grey;
    * {
      color: grey;
    }
  }
`;

export default Button;
