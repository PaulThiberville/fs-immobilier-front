import { Pop } from "../../../components/pop";
import SingleProduct from "../../../components/singleProduct";
import { useSelector } from "react-redux";

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

  return (
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
    </Pop>
  );
}
