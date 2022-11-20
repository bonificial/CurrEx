import React, {useContext, useEffect, useState} from "react";
import CurrExNavbar from "../components/Navbar";
import ConverterPanel from "../components/ConverterPanel";
import {fetchLatestRates, fetchSymbols} from "../utils/api";
import {notification} from "antd";
import {sampleRatesResponse} from "../utils/contants";
import currencyContext from "../context/CurrencyContext";
import {useParams,useLocation} from "react-router-dom";

interface AppProps {}

function Details(props: AppProps) {
    const [currencies, setCurrencies] = useState<any>([]);
    const [symbolFullName, setSymbolFullName] = useState<string>("");
    const { baseCurrency,setBaseCurrency } = useContext(currencyContext);
const {pathname} = useLocation();
    const { base,dest,amount } = useParams() // Get URL Route params
    let currentRoute = pathname.split("/")[1] //Get the Current Route

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
    }, [baseCurrency]);
     useEffect(() => {
        (async function (){
          const response = await fetchSymbols();

            if(response.success){

            setSymbolFullName(response.symbols[base || ''])
            }else{
                notification.error({
                    message: 'An Error Occured',
                    description:
                       response?.message || "A server or processing error occured. We dont have additional details on this."
                });

            }

        })()
    }, [baseCurrency]);

    return (
    <div>
      <CurrExNavbar />

      <ConverterPanel currencies={currencies} currentRoute={currentRoute}  pageParams={{symbolFullName,base,dest,amount:parseFloat(amount?.toString() || "0")}} />
    </div>
  );
}

export default Details;
