import { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faCheck, faCancel } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DashboardImage from "../components/dashboardImage";
import Loader from "../components/loader";
import { Helmet } from "react-helmet";
import Button from "../components/Button";
import { productActions } from "../features/product";

const StyledEditImages = styled.main`
  display: flex;
  flex-direction: column;
  gap: 50px;
  margin: 50px;
  .buttons-container {
    display: flex;
    gap: 10px;
    justify-content: center;
  }
`;

const Images = styled.div`
  background-color: white;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 10px;
  img {
    height: 100px;
    width: 100px;
    object-fit: cover;
  }
`;

const FileLabel = styled.label`
  cursor: pointer;
  input {
    display: none;
  }
  div {
    height: 100px;
    width: 100px;
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

function EditImages() {
  const [newImages, setNewImages] = useState([]);
  const { id } = useParams();
  const user = useSelector((state) => state.user.value);
  const product = useSelector((state) => state.product.value);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(productActions.getProduct(id));
  }, []);

  const onInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewImages([...newImages, ...e.target.files]);
      e.target.value = null;
    }
  };

  const handleSaveNewImages = async () => {
    let imagesToSave = [];
    for (let i = 0; i < newImages.length; i++) {
      const imgbbImage = await uploadImage(newImages[i]);
      console.log(imgbbImage);
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
          console.log("Images to Save : ", imagesToSave);
          await saveImages(imagesToSave);
          navigate("/dashboard");
        }
      }
    }
  };

  const uploadImage = async (image) => {
    console.log("save : ", image);
    var formData = new FormData();
    formData.append("image", image);
    const response = await fetch(
      "https://api.imgbb.com/1/upload?key=" + process.env.REACT_APP_IMGBB_KEY,
      {
        method: "POST",
        body: formData,
      }
    );
    if (response.ok) return await response.json();
  };

  const saveImages = async (imagesToSave) => {
    const response = await fetch(
      process.env.REACT_APP_API_URL + "/image/" + product._id,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
        body: JSON.stringify(imagesToSave),
      }
    );
    if (response.ok) console.log("save response :", await response.json());
    else {
      console.log("save error :", await response.json());
    }
  };

  const handleRemoveNewImage = async (imageToDelete) => {
    const response = await fetch(imageToDelete.delete_url);
    if (response.ok) {
      setNewImages(
        [...newImages].filter((image) => {
          return image !== imageToDelete;
        })
      );
    }
  };

  const handleRemoveImage = (imageId) => {
    dispatch(productActions.removeImage({ user, imageId }));
  };

  return (
    <StyledEditImages>
      <Helmet>
        <title>FS Immobilier - Editer les images </title>
        <meta name="description" content="Editer les images" />
      </Helmet>
      {error && <p>Error: {error}</p>}
      {loading && <Loader />}
      {product && !loading && (
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
            />
          </FileLabel>
          {product.images.map((image) => {
            return (
              <DashboardImage
                key={image._id}
                url={image.url}
                onDelete={() => handleRemoveImage(image._id)}
              />
            );
          })}
          {newImages.map((image, index) => {
            return (
              <DashboardImage
                key={index}
                url={URL.createObjectURL(image)}
                onDelete={() => handleRemoveNewImage(image)}
              />
            );
          })}
        </Images>
      )}

      <div className="buttons-container">
        <Button onClick={() => handleSaveNewImages()}>
          <FontAwesomeIcon icon={faCheck} />
        </Button>
        <Button
          onClick={(e) => {
            navigate("/dashboard");
          }}
        >
          <FontAwesomeIcon icon={faCancel} />
        </Button>
      </div>
    </StyledEditImages>
  );
}

export default EditImages;
