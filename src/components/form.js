import styled from "styled-components";

export const Form = styled.form`
  background-color: white;
  padding: 30px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  label {
    box-sizing: border-box;
    width: calc(50% - 16px);
  }

  @media only screen and (max-width: 500px) {
    flex-direction: column;
    label {
      width: 100%;
    }
  }
`;
