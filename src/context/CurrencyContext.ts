import { createContext, Dispatch } from "react";

interface contextInterface {
  baseCurrency: string;
  setBaseCurrency: Dispatch<any>;
}

const currencyContext = createContext<contextInterface>({
  baseCurrency: "EUR",
  setBaseCurrency: () => {},
});
export default currencyContext;
