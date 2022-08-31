import styled from "styled-components";

export const Form = styled.form`
  background-color: white;
  padding: 30px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
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
