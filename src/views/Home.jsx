import { useEffect, useState } from "react";
import CurrencyBox from "./CurrencyBox";

export default function Home(props) {
  const [dataDollars, setDataDollars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch("https://dolarapi.com/v1/dolares")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la petición");
        }
        return response.json();
      })
      .then((data) => {
        setDataDollars(data);
        console.log("data", data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#1a202c] dark:bg-[#1a202c] p-7">
      <div className="grid gap-6">
        {" "}
        {/* Elimina grid-rows-3 y h-[90vh] */}
        {/* Primera fila */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
          </div> */}
        {/* Segunda fila */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataDollars.map((dollar, index) => {
            return (
              <CurrencyBox
                key={"dollar" + index}
                type={dollar.casa}
                buyPrice={dollar.compra}
                sellPrice={dollar.venta}
                spread={Math.round(dollar.venta - dollar.compra)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
