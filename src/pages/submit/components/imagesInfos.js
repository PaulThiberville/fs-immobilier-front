import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import DashboardImage from "../../../components/dashboardImage";
import { submitActions } from "../../../features/submit";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { Pop } from "../../../components/pop";

const StyledEditImages = styled.main`
  width: 100%;
`;

const Images = styled.div`
  background-color: white;
  padding: 8px;
  gap: 8px;
  display: flex;
  flex-wrap: wrap;
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
`;

const FileLabel = styled.label`
  cursor: pointer;
  input {
    display: none;
  }
  div {
    width: 100px;
    height: 100px;
    background-color: green;
    display: flex;
    align-items: center;
    justify-content: center;
    * {
      font-size: 100px;
      color: white;
    }
  }
`;

function ImagesInfos() {
  const { images } = useSelector(state => state.submit);
  const dispatch = useDispatch();

  const onInput = e => {
    if (e.target.files && e.target.files.length > 0) {
      dispatch(
        submitActions.setImages({
          value: [...images.value, ...e.target.files],
          error: "",
        })
      );
      e.target.value = null;
    }
  };

  const handleRemoveImage = image => {
    dispatch(
      submitActions.setImages({
        value: [...images.value].filter(anImage => {
          return anImage !== image;
        }),
      })
    );
  };

  return (
    <Pop>
      <StyledEditImages>
        <Images>
          <FileLabel htmlFor="file" key={"fl"}>
            <div>
              <FontAwesomeIcon icon={faAdd} />
            </div>
            <input
              onInput={onInput}
              type="file"
              id="file"
              accept="image/png, image/jpg, image/gif, image/jpeg"
              multiple={"multiple"}
            />
          </FileLabel>
          {images.value.map((image, index) => {
            return (
              <DashboardImage
                key={index}
                url={URL.createObjectURL(image)}
                onDelete={() => handleRemoveImage(image)}
              />
            );
          })}
        </Images>
      </StyledEditImages>
    </Pop>
  );
}

export default ImagesInfos;
