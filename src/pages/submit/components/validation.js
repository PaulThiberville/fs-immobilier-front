import { Pop } from "../../../components/pop";
import SingleProduct from "../../../components/singleProduct";
import { useSelector } from "react-redux";
import { customFetch } from "../../../utils/customFetch";
import Button from "../../../components/Button";
import styled from "styled-components";

const Buttons = styled.div`
  width: max-content;
  display: flex;
  padding: 8px 0;
  gap: 8px;
  margin-left: auto;
`;

export default function Validation() {
  const {
    name,
    email,
    category,
    type,
    price,
    city,
    surface,
    rooms,
    bedrooms,
    description,
    images,
  } = useSelector(state => state.submit);

  const handleSaveProduct = async () => {
    const newProduct = await customFetch({
      route: "/product/",
      verb: "POST",
      data: {
        name: name.value,
        email: email.value,
        category: category.value,
        type: type.value,
        price: price.value,
        city: city.value,
        surface: surface.value,
        rooms: rooms.value,
        bedrooms: bedrooms.value,
        description: description.value,
      },
    });

    if (newProduct.data._id) {
      await handleSaveImages(newProduct.data._id);
    }
  };

  const handleSaveImages = async productId => {
    let imagesToSave = [];
    for (let i = 0; i < images.value.length; i++) {
      const imgbbImage = await uploadImage(images.value[i]);
      if (imgbbImage.success === true) {
        imagesToSave = [
          ...imagesToSave,
          {
            url: imgbbImage.data.url,
            thumb_url: imgbbImage.data.thumb.url,
            delete_url: imgbbImage.data.delete_url,
          },
        ];
        if (i === images.value.length - 1) {
          await saveImages(imagesToSave, productId);
        }
      }
    }
  };

  const uploadImage = async image => {
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

  const saveImages = async (imagesToSave, productId) => {
    const newImages = await customFetch({
      route: "/image/" + productId,
      verb: "POST",
      data: imagesToSave,
    });
  };

  return (
    <>
      <Pop>
        <SingleProduct
          product={{
            name: name.value,
            email: email.value,
            category: category.value,
            type: type.value,
            price: price.value,
            city: city.value,
            surface: surface.value,
            rooms: rooms.value,
            bedrooms: bedrooms.value,
            description: description.value,
            images: images.value,
          }}
        />
        <Buttons>
          <Button onClick={async () => await handleSaveProduct()}>
            Envoyer
          </Button>
        </Buttons>
      </Pop>
    </>
  );
}
