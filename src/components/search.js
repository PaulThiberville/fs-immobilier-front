import { Outlet, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { typesActions } from "../features/types";
import { productsActions } from "../features/products";
import { citiesActions } from "../features/cities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";

const StyledSearch = styled.form`
  margin-top: 10px;
  .container {
    width: 100%;
    width: 100%;
    max-width: 400px;
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
      * {
        flex-grow: 1;
      }
    }
    button {
      width: 100%;
    }
  }
`;

function Search({ category, setOptions }) {
  const types = useSelector(state => state.types.value);
  const cities = useSelector(state => state.cities.value);
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

  const handleSearch = e => {
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
            <Input
              list="cities"
              type={"text"}
              placeholder={"Ville"}
              onChange={e => setCity(e.target.value)}
            ></Input>
            <datalist id="cities">
              {cities?.map((aCity, index) => {
                return <option key={index} value={aCity} />;
              })}
            </datalist>
          </fieldset>
          <fieldset>
            <Input
              type={"number"}
              placeholder={"Surface"}
              onChange={e => setSurface(e.target.value)}
            ></Input>
            <Input
              type={"number"}
              placeholder={"Pieces"}
              onChange={e => setRooms(e.target.value)}
            ></Input>
          </fieldset>
          <fieldset>
            <Select onChange={e => setType(e.target.value)}>
              <option key={"0"} value={""}>
                Type
              </option>
              {types?.map(aType => (
                <option key={aType._id} value={aType.value}>
                  {aType.value}
                </option>
              ))}
            </Select>
            <Input
              type={"number"}
              placeholder={"Budget"}
              onChange={e => setPrice(e.target.value)}
            ></Input>
          </fieldset>
          <Button onClick={e => handleSearch(e)}>
            <FontAwesomeIcon icon={faSearch} />
            Search
          </Button>
        </div>
      </StyledSearch>
    </>
  );
}

export default Search;
