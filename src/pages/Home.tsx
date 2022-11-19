import React, {useContext, useEffect, useState} from "react";
import CurrExNavbar from "../components/Navbar";
import ConverterPanel from "../components/ConverterPanel";
import {fetchLatestRates} from "../utils/api";
import {notification} from "antd";
import {sampleRatesResponse} from "../utils/contants";
import currencyContext from "../context/CurrencyContext";

interface AppProps {}

function Home(props: AppProps) {
    const [currencies, setCurrencies] = useState<any>([]);


    const { baseCurrency,setBaseCurrency } = useContext(currencyContext);

     useEffect(() => {
        (async function (){
          const response = await fetchLatestRates(baseCurrency);

            if(response.success){

            setCurrencies(response.rates)
            }else{
                notification.error({
                    message: 'An Error Occured',
                    description:
                       response?.message || "A server or processing error occured. We dont have additional details on this."
                });

            }

        })()
    }, []);
 
    return (
    <div>
      <CurrExNavbar />
      <ConverterPanel currencies={currencies} />
    </div>
  );
}

export default Home;
