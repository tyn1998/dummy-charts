import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

import data1 from "./10cm湿度(kg:m2).json";
import data2 from "./40cm湿度(kg:m2).json";
import data3 from "./100cm湿度(kg:m2).json";
import data4 from "./200cm湿度(kg:m2).json";
import yyy2 from "./yyy2.json";

const generateSeries = (name, data) => {
  let yData = [];
  if (name === "True Value") {
    yData = data;
  } else {
    for (let i = 0; i < data.length; i++) {
      if (i < data.length - 12) {
        yData.push(null);
      } else {
        yData.push(data[i]);
      }
    }
  }
  return {
    name,
    data: yData,
    type: "line",
    smooth: true,
    symbol: "circle",
    // showAllSymbol: false,
    lineStyle: {
      width: name === "True Value" || name === "Transformer" ? 2 : 1,
    },
  };
};

const Lines = ({ width, height, title, data }) => {
  const divEL = useRef(null);

  let min = 0;
  if (title === "10cm湿度(kg:m2)") min = 10;
  if (title === "40cm湿度(kg:m2)") min = 30;
  if (title === "100cm湿度(kg:m2)") min = 40;
  if (title === "200cm湿度(kg:m2)") min = 164;

  const option = {
    // title: {
    //   text: title,
    //   textStyle: {
    //     fontSize: 12,
    //   },
    //   left: '8%',
    // },
    color: ["red", "#91cc75", "#fac858", "#ee6666", "#9a60b4", "skyblue"],
    grid: {
      bottom: "30%",
    },
    xAxis: {
      type: "category",
      data: yyy2["日期"],
      axisLabel: {
        rotate: -45,
      },
      axisLine: {
        symbol: ["none", "triangle"],
      },
    },
    yAxis: {
      name: title,
      type: "value",
      min,
    },
    legend: {},
    dataZoom: [
      {
        type: "slider",
        start: 80,
      },
    ],
    series: [
      generateSeries("True Value", data["True Value"]),
      generateSeries("ARIMA", data["ARIMA"]),
      generateSeries("RNN", data["RNN"]),
      generateSeries("LSTM", data["LSTM"]),
      generateSeries("GRU", data["GRU"]),
      generateSeries("Transformer", data["Transformer"]),
    ],
  };

  useEffect(() => {
    let chartDOM = divEL.current;
    const instance = echarts.init(chartDOM);
    console.log("Echarts instance initiated.");

    return () => {
      instance.dispose();
      console.log("Echarts instance disposed.");
    };
  }, []);

  useEffect(() => {
    let chartDOM = divEL.current;
    const instance = echarts.getInstanceByDom(chartDOM);
    if (instance) {
      instance.setOption(option);
    }
  });

  return <div ref={divEL} style={{ width, height }}></div>;
};

const YYY1 = () => {
  return (
    <div>
      <Lines
        width={"100vw"}
        height={"300px"}
        title="10cm湿度(kg:m2)"
        data={data1}
      />
      <br></br>
      <Lines
        width={"100vw"}
        height={"300px"}
        title="40cm湿度(kg:m2)"
        data={data2}
      />
      <br></br>
      <Lines
        width={"100vw"}
        height={"300px"}
        title="100cm湿度(kg:m2)"
        data={data3}
      />
      <br></br>
      <Lines
        width={"100vw"}
        height={"300px"}
        title="200cm湿度(kg:m2)"
        data={data4}
      />
      <br></br>
    </div>
  );
};

export default YYY1;
