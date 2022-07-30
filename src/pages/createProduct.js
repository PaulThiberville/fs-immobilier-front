import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreateProduct() {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [surface, setSurface] = useState("");
  const [rooms, setRooms] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const handleCreateProduct = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h1>Créer un produit :</h1>
      <form>
        <label>
          Titre:
          <input
            type={"text"}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          Description:
          <input
            type={"text"}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </label>
        <label>
          Prix:
          <input
            type={"number"}
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </label>
        <label>
          Ville:
          <input
            type={"text"}
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
        </label>
        <label>
          Surface:
          <input
            type={"number"}
            onChange={(e) => setSurface(e.target.value)}
            value={surface}
          />
        </label>
        <label>
          Pieces:
          <input
            type={"number"}
            onChange={(e) => setRooms(e.target.value)}
            value={rooms}
          />
        </label>
        <button
          onClick={(e) => {
            handleCreateProduct(e);
          }}
        ></button>
      </form>
    </div>
  );
}

export default CreateProduct;
