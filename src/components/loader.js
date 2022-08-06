import { TailSpin } from "react-loader-spinner";
import styled from "styled-components";

const StyledLoader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    background-color: white;
    border-radius: 50%;
    padding: 5px;
  }
`;

function Loader() {
  return (
    <StyledLoader>
      <div>
        <TailSpin
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="tail-spin-loading"
          wrapperStyle
        />
      </div>
    </StyledLoader>
  );
}

export default Loader;
