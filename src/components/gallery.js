import styled from "styled-components";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretLeft,
  faCaretRight,
  faCircle,
  faCircleDot,
} from "@fortawesome/free-solid-svg-icons";

const StyledGallery = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .dots {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px;
    gap: 5px;
    * {
      filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.2));
      color: white;
    }
  }

  .buttons {
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    button {
      padding: 0 30px;
      height: 100%;
      background-color: transparent;
      border: none;
      cursor: pointer;
      * {
        filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.2));
        color: white;
        font-size: 30px;
      }
    }
  }
`;

function Gallery({ images, type }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [displaybles, setDisplayables] = useState([
    {
      _id: "noImage",
      url: "/no_image.png",
      thumbnail_url: "/no_image.png",
    },
  ]);

  useEffect(() => {
    if (images[0]) {
      setDisplayables(images);
    }
  }, []);

  const handleNext = () => {
    if (selectedIndex === displaybles.length - 1) {
      return setSelectedIndex(0);
    }
    return setSelectedIndex(selectedIndex + 1);
  };

  const handlePrevious = () => {
    if (selectedIndex === 0) {
      return setSelectedIndex(displaybles.length - 1);
    }
    return setSelectedIndex(selectedIndex - 1);
  };

  return (
    <StyledGallery>
      <img
        src={
          type === "full"
            ? displaybles[selectedIndex].url
            : displaybles[selectedIndex].thumbnail_url
        }
        alt={displaybles[selectedIndex].url}
      />
      <div className={"dots"}>
        {displaybles.map((image, index) => {
          return (
            <FontAwesomeIcon
              key={image._id}
              icon={index === selectedIndex ? faCircle : faCircleDot}
            />
          );
        })}
      </div>
      <div className={"buttons"}>
        <button onClick={() => handlePrevious()}>
          <FontAwesomeIcon icon={faCaretLeft} />
        </button>
        <button onClick={() => handleNext()}>
          <FontAwesomeIcon icon={faCaretRight} />
        </button>
      </div>
    </StyledGallery>
  );
}

export default Gallery;
