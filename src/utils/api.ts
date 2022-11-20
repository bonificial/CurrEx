import { sampleRatesResponse } from "./contants";

const requestHeaders = new Headers();
requestHeaders.append("apikey", process.env.REACT_APP_FIXER_API_KEY || ""); //Will definitely return error if you have not setup a .env file with an API key from fixer
let requestOptions: RequestInit = {
  method: "GET",
  headers: requestHeaders,
  redirect: "follow",
};
export const fetchLatestRates = (baseCurrency: string) => {
  return { ...sampleRatesResponse, base: baseCurrency }; //Use this in dev only to disable API request and use test response values
  return fetch(
    `https://api.apilayer.com/fixer/latest?base=${baseCurrency}`,
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
};

export const fetchSymbols = () => {
  //  return { ...sampleSymbolsResponse }; ////Use this in dev only to disable API request and use test response values
  return fetch("https://api.apilayer.com/fixer/symbols", requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
};

export const fetchTimeSeries = (
  startDate: string,
  endDate: string,
  base?: string,
  dest?: string
) => {
  // return { ...sampleTimeSeriesDataResponse }; ////Use this in dev only to disable API request and use test response values
  return fetch(
    `https://api.apilayer.com/fixer/timeseries?start_date=${startDate}&end_date=${endDate}&base=${base}&symbols=${dest}`,
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
};
