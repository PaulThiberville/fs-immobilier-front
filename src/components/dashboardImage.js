import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledDashboardImage = styled.article`
  display: flex;
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    overflow: hidden;
  }
  .container {
    position: absolute;
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.4);
    &:hover {
      opacity: 1;
    }
    * {
      color: white;
    }
  }
`;

function DashboardImage({ url, onDelete }) {
  return (
    <StyledDashboardImage>
      <img src={url} alt={url} />
      <div className="container">
        <FontAwesomeIcon icon={faTrash} onClick={() => onDelete()} />
      </div>
    </StyledDashboardImage>
  );
}

export default DashboardImage;
