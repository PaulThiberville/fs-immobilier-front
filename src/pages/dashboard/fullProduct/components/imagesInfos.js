import { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import DashboardImage from "../../../../components/dashboardImage";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { productActions } from "../../../../features/product";
import { useParams } from "react-router-dom";
import { customFetch } from "../../../../utils/customFetch";
import Button from "../../../../components/Button";
import Loader from "../../../../components/loader";

const StyledEditImages = styled.div`
  width: 100%;
`;

const Buttons = styled.div`
  display: flex;
  width: max-content;
  gap: 8px;
  margin-bottom: 32px;
  margin-right: 32px;
  margin-left: auto;
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

export function ImagesInfos() {
  const { id } = useParams();
  const user = useSelector(state => state.user.value);
  const {
    value: product,
    loading,
    error,
  } = useSelector(state => state.product);
  const dispatch = useDispatch();
  const [newImages, setNewImages] = useState([]);

  const onInput = e => {
    if (e.target.files && e.target.files.length > 0) {
      setNewImages([...newImages, ...e.target.files]);
      e.target.value = null;
    }
  };

  const handleRemoveImage = async image => {
    try {
      await customFetch({
        route: "/image/" + image._id,
        verb: "DELETE",
        token: user.token,
      });
      dispatch(productActions.getProduct(id));
    } catch (error) {
      alert("Error while removing image: " + error.message);
    }
  };

  const handleRemoveNewImage = image => {
    setNewImages(
      [...newImages].filter(anImage => {
        return anImage !== image;
      })
    );
  };

  const handleSaveImages = async () => {
    let imagesToSave = [];
    for (let i = 0; i < newImages.length; i++) {
      const imgbbImage = await uploadImage(newImages[i]);
      if (imgbbImage.success === true) {
        imagesToSave = [
          ...imagesToSave,
          {
            url: imgbbImage.data.url,
            thumb_url: imgbbImage.data.thumb.url,
            delete_url: imgbbImage.data.delete_url,
          },
        ];
        if (i === newImages.length - 1) {
          await saveImages(imagesToSave);
          setNewImages([]);
          dispatch(productActions.getProduct(id));
        }
      }
    }
  };

  const uploadImage = async image => {
    try {
      var formData = new FormData();
      formData.append("image", image);
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=" + process.env.REACT_APP_IMGBB_KEY,
        {
          method: "POST",
          body: formData,
        }
      );
      const json = await response.json();
      return json;
    } catch (error) {
      alert("Error on upload image: " + error.message);
    }
  };

  const saveImages = async imagesToSave => {
    const newImages = await customFetch({
      route: "/image/" + id,
      verb: "POST",
      data: imagesToSave,
    });
  };

  useEffect(() => {
    dispatch(productActions.getProduct(id));
  }, []);

  return (
    <StyledEditImages>
      {loading && <Loader />}
      {!loading && (
        <>
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
            {product?.images.map((image, index) => {
              return (
                <DashboardImage
                  key={"images" + index}
                  url={image.thumb_url}
                  onDelete={async () => await handleRemoveImage(image)}
                />
              );
            })}
            {newImages.map((image, index) => {
              return (
                <DashboardImage
                  key={"newImages" + index}
                  url={URL.createObjectURL(image)}
                  onDelete={() => handleRemoveNewImage(image)}
                />
              );
            })}
          </Images>
          <Buttons>
            <Button
              disabled={loading}
              onClick={async () => await handleSaveImages()}
            >
              Sauvegarder
            </Button>
          </Buttons>
        </>
      )}
    </StyledEditImages>
  );
}
