const requestHeaders = new Headers();
requestHeaders.append("apikey", process.env.REACT_APP_FIXER_API_KEY || ""); //Will definitely return error if you have not setup a .env file with an API key from fixer

export const fetchLatestRates = () => {
  var requestOptions: RequestInit = {
    method: "GET",
    headers: requestHeaders,
    redirect: "follow",
  };

  return fetch("https://api.apilayer.com/fixer/latest", requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
};