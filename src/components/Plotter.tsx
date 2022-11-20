import React, { useEffect, useState } from "react";
import moment from "moment";
import { SHORTDATE } from "../utils/contants";
import { fetchTimeSeries } from "../utils/api";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

interface PlotterProps {
  base?: string;
  dest?: string;
}

 
function Plotter({ base,dest }: PlotterProps) {
  let endDate = moment().format(SHORTDATE);
  let startDate = moment().subtract("12", "months").format(SHORTDATE);
  const [timeSeriesData, setTimeSeriesData] = useState<
    Array<{ date: string; value: {} }>
  >([]);

  console.log(startDate, endDate);

  useEffect(() => {
    (async function run() {
      let seriesData = await fetchTimeSeries(startDate, endDate,base,dest);
      console.log(seriesData);
      let rateValues = Object.values(seriesData.rates);
      let dataMapping: Array<{ date: string; value: {} }> = [];
      Object.keys(seriesData.rates).map((rateKey, index) => {
        let lastDay = moment(rateKey, "YYYY-MM-DD h:m")
          .endOf("month")
          .format(SHORTDATE);
        if (lastDay == rateKey) {
          //Only add the last day of that month
          dataMapping.push({
            date: moment(rateKey).format("MMM YY"),
            value: (rateValues[index] as any)[`${dest}`] as any,
          });
        }
      });

      setTimeSeriesData(dataMapping);
    })();
  }, [base,dest]);

  return (
    <div className={"p-12"} style={{ backgroundColor: "#252d38" }}>
      <LineChart width={1200} height={300} data={timeSeriesData}>
        <XAxis dataKey="date" />
        <YAxis color={"#dad2d2"} dataKey={"value"} />
        <CartesianGrid stroke="#fff" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="value" stroke="#af2525" />
      </LineChart>
    </div>
  );
}

export default Plotter;
