import styled from "styled-components";

const StyledSelect = styled.select`
  border: none;
  background-color: white;
  outline: none;
  height: 30px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-left: ${props =>
    props.error === true ? "4px solid red" : "4px solid green"};
  border-bottom: ${props =>
    props.error === true ? "1px solid red" : "1px solid green"};
  width: 100%;
  margin-top: 8px;
`;

const Error = styled.p`
  color: red;
  font-weight: normal;
  margin-top: 8px;
  width: 100%;
`;

const Label = styled.label`
  font-weight: bold;
  display: flex;
  flex-direction: column;
`;

export default function Select({ title, error, ...props }) {
  return (
    <Label htmlFor={title}>
      {title}
      <StyledSelect name={title} {...props} error={Boolean(error)} />
      <Error>{error || null}</Error>
    </Label>
  );
}
