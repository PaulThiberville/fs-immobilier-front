import { Outlet, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { typesActions } from "../features/types";
import { productsActions } from "../features/products";
import { citiesActions } from "../features/cities";
import { EmailJSResponseStatus } from "@emailjs/browser";

const StyledSearch = styled.form`
  margin: 10px;
  padding: 30px 0;
  background-color: green;
  .container {
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    fieldset {
      border: none;
      width: 100%;
      display: flex;
      gap: 10px;
      input {
        width: 50px;
        padding-left: 5px;
      }

      * {
        flex-grow: 1;
        height: 30px;
        border: none;
      }
    }

    button {
      padding: 10px;
    }
  }
`;

function Search({ category, setOptions }) {
  const types = useSelector((state) => state.types.value);
  const cities = useSelector((state) => state.cities.value);
  const [city, setCity] = useState("");
  const [price, setPrice] = useState(0);
  const [surface, setSurface] = useState(0);
  const [rooms, setRooms] = useState(0);
  const [type, setType] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(typesActions.getTypes());
    dispatch(productsActions.getProducts({ category }));
    setOptions({ category });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(productsActions.reinit());
    const options = {};
    if (city) options.city = city;
    if (price) options.price = price;
    if (surface) options.surface = surface;
    if (rooms) options.rooms = rooms;
    if (type) options.type = type;
    if (category) options.category = category;
    dispatch(productsActions.getProducts(options));
    setOptions(options);
  };

  useEffect(() => {
    dispatch(citiesActions.clear());
    if (city.length >= 1) {
      dispatch(citiesActions.getCities(city));
    }
  }, [city]);

  useState(() => {
    return dispatch(productsActions.reinit());
  }, []);

  return (
    <>
      <StyledSearch>
        <div className="container">
          <fieldset>
            <input
              list="cities"
              type={"text"}
              placeholder={"Ville"}
              onChange={(e) => setCity(e.target.value)}
            ></input>
            <datalist id="cities">
              {cities?.map((aCity, index) => {
                return <option key={index} value={aCity} />;
              })}
            </datalist>
          </fieldset>
          <fieldset>
            <input
              type={"number"}
              placeholder={"Surface"}
              onChange={(e) => setSurface(e.target.value)}
            ></input>
            <input
              type={"number"}
              placeholder={"Pieces"}
              onChange={(e) => setRooms(e.target.value)}
            ></input>
          </fieldset>
          <fieldset>
            <select onChange={(e) => setType(e.target.value)}>
              <option key={"0"} value={""}>
                Type
              </option>
              {types?.map((aType) => (
                <option key={aType._id} value={aType.value}>
                  {aType.value}
                </option>
              ))}
            </select>
            <input
              type={"number"}
              placeholder={"Budget"}
              onChange={(e) => setPrice(e.target.value)}
            ></input>
          </fieldset>
          <button onClick={(e) => handleSearch(e)}>Search</button>
        </div>
      </StyledSearch>
    </>
  );
}

export default Search;
