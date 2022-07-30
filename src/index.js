import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

//Redux
import configureAppStore from "./app/store";
import { Provider } from "react-redux";

//React router
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./pages/contact";

//Pages and components
import Layout from "./components/layout";
import Login from "./pages/login";
import Products from "./pages/Products";
import Home from "./pages/home";
import NoPage from "./pages/noPage";
import Dashboard from "./pages/dashboard";
import CreateProduct from "./pages/createProduct";

const store = configureAppStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products/" element={<Products />} />
          <Route path="contact/" element={<Contact />} />
          <Route path="login/" element={<Login />} />
          <Route path="dashboard/" element={<Dashboard />} />
          <Route path="create/" element={<CreateProduct />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
