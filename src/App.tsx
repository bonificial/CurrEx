import React, { createContext, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  createBrowserRouter,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import CurrencyContext from "./context/CurrencyContext";
import Details from "./pages/Details";

function App() {
  const [baseCurrency, setBaseCurrency] = useState("EUR");
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/details",
      element: <Details />,
    },
  ]);
  return (
    <React.StrictMode>
      <CurrencyContext.Provider value={{ baseCurrency, setBaseCurrency }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/details" element={<Details />} >
            <Route path=":base/:dest/:amount" element={<Details />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CurrencyContext.Provider>
    </React.StrictMode>
  );
}

export default App;
