import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { productsActions } from "./features/products";

function App() {
  const products = useSelector((state) => state.products.value);
  const error = useSelector((state) => state.products.error);
  const loading = useSelector((state) => state.products.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsActions.setProducts());
  }, []);

  return (
    <div className="App">
      {loading && <p>Loading...</p>}
      {error && <p>Error : {error}</p>}
      {products[0] && <p>{JSON.stringify(products)}</p>}
    </div>
  );
}

export default App;
