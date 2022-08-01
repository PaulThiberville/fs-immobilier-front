import { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faCheck, faCancel } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { productsActions } from "../features/products";
import { useNavigate, useParams } from "react-router-dom";

const StyledEditImages = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 50px;
  div {
    display: flex;
    gap: 10px;
    width: 100%;
    justify-content: center;
    button {
      background-color: white;
      border: none;
      height: 30px;
      width: 30px;
      display: flex;
      align-items: center;
      justify-content: center;

      * {
        color: green;
      }

      &:hover {
        cursor: pointer;
        background-color: green;
        * {
          color: white;
        }
      }
    }
  }
`;

const Images = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
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
  const product = useSelector((state) => state.products.value[0]);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.token) {
      dispatch(productsActions.setProduct({ user, productId: id }));
    }
  }, [user]);

  const onInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewImages([...newImages, ...e.target.files]);
      e.target.value = null;
    }
  };

  const handleSaveNewImages = async () => {
    for (let i = 0; i < newImages.length; i++) {
      const imgbbImage = await uploadImage(newImages[i]);
      if (imgbbImage) {
        console.log(imgbbImage);
        await saveImage(imgbbImage);
      }
    }
  };

  const uploadImage = async (image) => {
    console.log("img :", image);
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

  const saveImage = async (imgbbImage) => {
    const response = await fetch(
      process.env.REACT_APP_API_URL + "/image/" + product._id,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
        body: JSON.stringify([imgbbImage]),
      }
    );
    if (response.ok) console.log("save response :", await response.json());
    else {
      console.log("save error :", await response.json());
    }
  };

  if (error) return <p>Error: {error}</p>;
  if (loading) return <p>Loading...</p>;
  if (product)
    return (
      <StyledEditImages>
        <h1>Images du produit :</h1>
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
              <img
                key={image._id}
                src={image.url}
                alt={JSON.stringify(image)}
              />
            );
          })}
          {newImages.map((image, index) => {
            return (
              <img key={index} src={URL.createObjectURL(image)} alt="preview" />
            );
          })}
        </Images>
        <div>
          <button onClick={() => handleSaveNewImages()}>
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button
            onClick={(e) => {
              navigate("/dashboard");
            }}
          >
            <FontAwesomeIcon icon={faCancel} />
          </button>
        </div>
      </StyledEditImages>
    );
}

export default EditImages;
