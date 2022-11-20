import React, { useState } from "react";

import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import CurrencyContext from "./context/CurrencyContext";
import Details from "./pages/Details";

function App() {
  const [baseCurrency, setBaseCurrency] = useState("EUR");

  return (
    <React.StrictMode>
      <CurrencyContext.Provider value={{ baseCurrency, setBaseCurrency }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/details" element={<Details />}>
              <Route path=":base/:dest/:amount" element={<Details />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CurrencyContext.Provider>
    </React.StrictMode>
  );
}

export default App;
