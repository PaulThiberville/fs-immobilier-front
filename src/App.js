import logo from "./logo.svg";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "./features/products";
import { useEffect } from "react";

function App() {
  const products = useSelector((state) => state.products.value);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getAllProducts() {
      const response = await fetch(process.env.REACT_APP_API_URL + "/product/");
      dispatch(setProducts(await response.json()));
    }
    getAllProducts();
  }, []);

  return <div className="App">{JSON.stringify(products)}</div>;
}

export default App;
