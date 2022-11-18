import React, { useState } from "react";
import CurrexValueInput from "./CurrexValueInput";
import CurrexButton from "./CurrexButton";
import { FaArrowRight } from "react-icons/fa";
import { currencyPairs } from "../utils/contants";

interface ConverterProps {}

function ConverterPanel(props: ConverterProps) {
  const [currentDefaultFromCurrency, setCurrentDefaultFromCurrency] =
    useState("EUR");

  //Do necessary updates once the FROM currency in converter panel is updated
  const onChangeEitherCurrency = (newValue: string, relation: string) => {
    if (newValue !== currentDefaultFromCurrency && relation == "from") {
      setCurrentDefaultFromCurrency(newValue);
    }
    return newValue;
  };

  return (
     <div className="   bg-gray-600 hover:bg-gray-700 p-10">
       <div className={" container p-2 border-2 border-slate-400   mx-auto   "}>
         <div className="  grid grid-rows-2 grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
           <div className={"col-span-2 md:col-span-1"}>
             <CurrexValueInput
                 label={"Amount"}
                 type={"number"}
                 mode={"Input"}
                 placeholder={"00.00"}
             />
           </div>
           <div
               className={
                 "col-span-2 row-span-2 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 "
               }
           >
             <div>
               <CurrexValueInput
                   label={"From"}
                   mode={"Select"}
                   dataset={currencyPairs}
                   defaultValue={
                     currencyPairs.filter(
                         (pair) => pair.itemValue == currentDefaultFromCurrency
                     )[0]
                   }
                   onChangeValue={(val) => onChangeEitherCurrency(val, "from")}
               />
             </div>

             <div>
               <CurrexValueInput
                   label={"To"}
                   mode={"Select"}
                   dataset={currencyPairs.filter(
                       (pair) => pair.itemValue !== currentDefaultFromCurrency
                   )}
                   value={
                     currencyPairs.filter(
                         (pair) => pair.itemValue !== currentDefaultFromCurrency
                     )[0].itemValue
                   }
                   onChangeValue={(val) => onChangeEitherCurrency(val, "to")}
               />
             </div>
             <div className={"col-span-2"}>
               <CurrexButton label={"Convert"} icon={<FaArrowRight />} />
             </div>
           </div>
         </div>
         <div className="items-center  grid grid-rows-2 grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
           <div className={"col-span-2 md:col-span-1"}>
             <p className={"p-3 border-2 border-slate-300 rounded text-white  "}>
               1.00 EUR = XX.XX USD
             </p>
           </div>
           <div className={"col-span-2 md:col-span-1"}>
             <p className={"p-6 font-bold border-2 border-slate-300 rounded text-white text-center "}>
               XX.XX USD
             </p>
           </div>
           <div className={"col-span-2 md:col-span-1"}>
             <a href={'#'} className={'p-2 px-12 rounded bg-blue-500 hover:bg-blue-400 text-white'}>More Details</a>
           </div>
         </div>
       </div>
     </div>

  );
}

export default ConverterPanel;
