import styled from "styled-components";

export const Pop = styled.div`
  overflow: hidden;
  width: 100%;
  max-height: auto;
  animation: 0.5s pop;
  @keyframes pop {
    from {
      height: 0px;
    }
    to {
      height: 120px;
    }
  }
`;
