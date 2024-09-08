import { createContext } from "react";

const InflationContext = createContext();

const InflationProvider = ({ children }) => {
    const hola = "HOLA MUNDO";
  return (
    <InflationContext.Provider value={{hola}}>{children}</InflationContext.Provider>
  );
};

export { InflationProvider };

export default InflationContext;
