import React from "react";
import CurrExNavbar from "../components/Navbar";
import ConverterPanel from "../components/ConverterPanel";

interface AppProps {}

function Home(props: AppProps) {
  return (
    <div>
      <CurrExNavbar />
      <ConverterPanel />
    </div>
  );
}

export default Home;
