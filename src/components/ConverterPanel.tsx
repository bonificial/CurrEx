import React, { useContext, useEffect, useState } from "react";
import CurrexValueInput from "./CurrexValueInput";
import CurrexButton from "./CurrexButton";
import { FaArrowRight, FaArrowsAltH } from "react-icons/fa";

import { fetchLatestRates } from "../utils/api";
import currencyContext from "../context/CurrencyContext";
import { currencyOptionFormat, topPopularCurrencies } from "../utils/contants";
import { notification } from "antd";
import ConversionCard from "./ConversionCard";
import { useNavigate } from "react-router-dom";
import Plotter from "./Plotter";

type pageParamsType = {
  base?: string;
  symbolFullName?: string;
  dest?: string;
  amount?: number;
};

interface ConverterProps {
  currencies: Array<{}>;
  currentRoute?: string;
  pageParams?: pageParamsType;
}

type topConversion = {
  currency: string;
  amount: number;
};

function ConverterPanel({
  currencies,
  currentRoute,
  pageParams,
}: ConverterProps) {
  const { baseCurrency, setBaseCurrency } = useContext(currencyContext);
  const [currentToCurrency, setCurrentToCurrency] = useState<string>(
    pageParams?.dest || "USD"
  );
  const [conversionAmount, setConversionAmount] = useState<number>(
    pageParams?.amount || 0
  );
  const [currentExchangeRate, setCurrentExchangeRate] = useState<number>(0);
  const [totalConvertedValue, setTotalConvertedValue] = useState<number>(0);
  const [topConversions, setTopConversions] = useState<Array<topConversion>>(
    []
  );
  const navigate = useNavigate();
/*  useEffect(() => {
    if (pageParams?.base) {
      setBaseCurrency(pageParams?.base);
    }
  }, [pageParams]);*/

  useEffect(() => {
    if (!conversionAmount || !currencies || !totalConvertedValue || minified)
      return; //totalConvertedValue here makes sure that the top 9 currencies wont autocalculate on page load
    calculateTopNineConversions();
  }, [baseCurrency, currencies]);
  useEffect(() => {
    if (!currencies) return;
    console.log(currencies);
    let exchangeRate =
      Object.values(currencies)[
        Object.keys(currencies).indexOf(currentToCurrency)
      ];
    setCurrentExchangeRate(parseFloat(`${exchangeRate}`));
  }, [conversionAmount, currencies, currentToCurrency, baseCurrency]);

  useEffect(() => {
    if(minified){
      navigate(`/details/${baseCurrency}/${currentToCurrency}/${conversionAmount}`)
    }
  }, [baseCurrency,currentToCurrency]);


  let minified = currentRoute !== "/";
  // console.log(currencies);
  console.log(currentRoute, minified, baseCurrency, currentToCurrency);
  const calculateTotalConverted = () => {
    let total = conversionAmount * currentExchangeRate;
    setTotalConvertedValue(total);
    if (!minified) calculateTopNineConversions();
  };
  const calculateTopNineConversions = () => {
    //console.log(baseCurrency,currentToCurrency)
    let topExchangeValues: Array<topConversion> = [];
    topPopularCurrencies
      .filter((curr) => curr != (currentToCurrency && curr != baseCurrency))
      .map((currency) => {
        let exRate = parseFloat(
          `${
            Object.values(currencies)[Object.keys(currencies).indexOf(currency)]
          }`
        );
        //  console.log( exRate , conversionAmount)
        topExchangeValues.push({
          currency: currency,
          amount: exRate * conversionAmount,
        });
      });
    console.log(topExchangeValues);
    setTopConversions(topExchangeValues);
  };

  const swapCurrencies = () => {
    //Swap the Base and Destination Currencies
    console.log(baseCurrency, currentToCurrency,pageParams);
    let destCurrency = currentToCurrency;
    let fromCurrency = baseCurrency;
    console.log("swapn", fromCurrency, destCurrency);

    console.log('setting base currency to ', destCurrency)
    setBaseCurrency(destCurrency);
    console.log('setting dest currency to ', fromCurrency)
    setCurrentToCurrency(fromCurrency);


    notification.info({
      message: "Swapped",
      description: ` Currencies swapped. Now Exchanging ${currentToCurrency} to ${baseCurrency}`,
    });
   // navigate(`/details/${destCurrency}/${destCurrency}/${conversionAmount}`)
  };

  const onChangeEitherCurrency = (newValue: string, relation: string) => {
    if (newValue !== baseCurrency && relation == "from") {
      //When the Base Currency is Changed (From)
      //setCurrentDefaultFromCurrency(newValue);
      setBaseCurrency(newValue);
      if (newValue == currentToCurrency) {
        setCurrentToCurrency(
          Object.keys(currencies).filter((pair) => pair !== baseCurrency)[0]
        );
      }
    }
    if (newValue !== currentToCurrency && relation == "to") {
      //When the  destination ('To') Currency is changed
      setCurrentToCurrency(newValue);
      if (newValue == baseCurrency) {
        setBaseCurrency(
          Object.keys(currencies).filter((pair) => pair !== newValue)[0]
        );
      }
    }

    return newValue;
  };

  return (
    <div className="bg-gray-600 hover:bg-gray-700 p-10">
      <div className={" container p-2 border-2 border-slate-400   mx-auto"}>
        <div className=" sticky top-0 bg-gray-600 hover:bg-gray-700 z-50 ">
        <div className="   flex justify-between px-12">
          <p className={"text-2xl font-bold py-4 text-white"}>
            {minified
              ? `${baseCurrency} - ${pageParams?.symbolFullName}`
              : "Currency Exchanger"}
          </p>
          {minified && (
            <a
              className={
                "p-2 px-12 rounded bg-blue-500 hover:bg-blue-400 text-white flex items-center"
              }
              href={"/"}
            >
              Back to Home
            </a>
          )}
        </div>

        <div className="  sticky top-0 grid grid-rows-2 grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div className={"col-span-2 md:col-span-1"}>
            <CurrexValueInput
              label={"Amount"}
              type={"number"}
              mode={"Input"}
              placeholder={"00.00"}
              value={conversionAmount.toString()}
              onChangeValue={(val) => {
                setConversionAmount(parseFloat(val));
              }}
            />
          </div>
          <div
            className={
              "col-span-2 row-span-2 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 "
            }
          >
            <div className={"  grid gap-3 grid-cols-3"}>
              <div className="col-span-2">
                <CurrexValueInput
                  label={"From"}
                  mode={"Select"}
                  disabled={minified || !conversionAmount}
                  dataset={Object.keys(currencies).map((curr) => {
                    return { itemValue: curr, itemLabel: curr };
                  })}
                  value={
                    Object.keys(currencies).filter(
                      (pair) => pair == baseCurrency
                    )[0]
                  }
                  defaultValue={
                    Object.keys(currencies).filter(
                      (pair) => pair == baseCurrency
                    )[0]
                  }
                  onChangeValue={(val) => onChangeEitherCurrency(val, "from")}
                />
              </div>
              <div className="col-span-1 flex items-center">
                <CurrexButton
                  onClickHandler={() => {
                    swapCurrencies();
                  }}
                  style={{
                    height: "100%",
                    backgroundColor: "transparent",
                    fontSize: "45px",
                    color: conversionAmount ? "#1677ff" : "#85898f",
                  }}
                  label={""}
                  icon={<FaArrowsAltH />}
                  disabled={!conversionAmount}
                />
              </div>
            </div>

            <div>
              <CurrexValueInput
                label={"To"}
                mode={"Select"}
                dataset={Object.keys(currencies)
                  .map((curr) => {
                    return { itemValue: curr, itemLabel: curr };
                  })
                  .filter((pair) => pair.itemValue !== baseCurrency)}
                disabled={!conversionAmount}
                value={
                  currentToCurrency !== baseCurrency
                    ? currentToCurrency
                    : Object.keys(currencies).filter(
                        (pair) => pair == baseCurrency
                      )[0]
                }
                onChangeValue={(val) => onChangeEitherCurrency(val, "to")}
              />
            </div>
            <div className={"col-span-2"}>
              <CurrexButton
                onClickHandler={() => {
                  calculateTotalConverted();
                }}
                label={"Convert"}
                icon={<FaArrowRight />}
                disabled={!conversionAmount}
              />
            </div>
          </div>
        </div>
        <div className="items-center mt-5 grid grid-rows-2 grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div className={"col-span-2 md:col-span-1"}>
            <p className={"p-3 border-2 border-slate-300 rounded text-white  "}>
              1.00 {baseCurrency} = {currentExchangeRate.toFixed(2)}{" "}
              {currentToCurrency}
            </p>
          </div>
          <div className={"col-span-2 md:col-span-1"}>
            <ConversionCard
              textToDisplay={
                totalConvertedValue.toFixed(2) + " " + currentToCurrency
              }
            />
          </div>
          <div
            className={"col-span-2 md:col-span-1"}
            style={{ display: minified ? "none" : "block" }}
          >
            <a
              href={`/details/${baseCurrency}/${currentToCurrency}/${conversionAmount}`}
              className={
                "p-2 px-12 rounded bg-blue-500 hover:bg-blue-400 text-white"
              }
            >
              More Details
            </a>
          </div>
        </div>
        </div>
        <div className="border-2 border-slate-400 p-12 z-10">
          {!minified ? <div className="grid gap-4 grid-rows-3 grid-cols-3">
            {topConversions
              .filter(
                (cnv) =>
                  cnv.currency !== baseCurrency &&
                  cnv.currency !== currentToCurrency
              )
              .map((cnv, index) => {
                if (index < 9) {
                  return (
                    <div className={"col-span-1"}>
                      <ConversionCard
                        textToDisplay={
                          cnv.amount.toFixed(2) + " " + cnv.currency
                        }
                      />
                    </div>
                  );
                }
              })}
          </div> :
              <Plotter dest={pageParams?.dest} base={pageParams?.base}/> }
        </div>
      </div>
    </div>
  );
}

export default ConverterPanel;
