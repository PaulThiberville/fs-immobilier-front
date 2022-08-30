import styled from "styled-components";

const StyledStatus = styled.div`
  background-color: ${props => props.color};
  padding: 10px;
  width: 100px;
  color: white;
  font-weight: bold;
`;

const getColor = status => {
  if (status === "pending") return "grey";
  if (status === "hidden") return "red";
  if (status === "visible") return "green";
};

export default function Status({ status }) {
  return (
    <StyledStatus color={getColor(status)}>{status.toUpperCase()}</StyledStatus>
  );
}
