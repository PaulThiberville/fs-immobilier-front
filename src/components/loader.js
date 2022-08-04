import { MutatingDots } from "react-loader-spinner";
import styled from "styled-components";

const StyledLoader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Loader() {
  return (
    <StyledLoader>
      <MutatingDots
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="three-dots-loading"
        wrapperStyle
        wrapperClass
      />
    </StyledLoader>
  );
}

export default Loader;
