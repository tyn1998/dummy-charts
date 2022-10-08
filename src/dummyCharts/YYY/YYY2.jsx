import React, { useState, useEffect, useRef } from "react";
import * as echarts from "echarts";
import yyy2 from "./yyy2.json";

const baseOption = {
  xAxis: {
    type: "category",
    name: "日期",
    data: yyy2["日期"],
    axisLabel: {
      rotate: -45,
    },
    axisLine: {
      symbol: ["none", "triangle"],
    },
  },
  yAxis: {
    type: "value",
  },
  legend: {},
  // dataZoom: [
  //   {
  //     type: "slider",
  //   },
  // ],
  series: [
    {
      name: "土壤蒸发量(mm)",
      data: yyy2["土壤蒸发量(mm)"],
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 2,
      showAllSymbol: false,
      lineStyle: {
        width: 1,
      },
    },
    {
      name: "平均气温(℃)",
      data: yyy2["平均气温(℃)"],
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 2,
      showAllSymbol: false,
      lineStyle: {
        width: 1,
      },
    },
    {
      name: "降水量(mm)",
      data: yyy2["降水量(mm)"],
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 2,
      showAllSymbol: false,
      lineStyle: {
        width: 1,
      },
    },
    {
      name: "植被指数(NDVI)",
      data: yyy2["植被指数(NDVI)"],
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 2,
      showAllSymbol: false,
      lineStyle: {
        width: 1,
      },
    },
    {
      name: "径流量(m3/s)",
      data: yyy2["径流量(m3/s)"],
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 2,
      showAllSymbol: false,
      lineStyle: {
        width: 1,
      },
    },
    {
      name: "低层植被(LAIL2/m2)",
      data: yyy2["低层植被(LAIL2/m2)"],
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 2,
      showAllSymbol: false,
      lineStyle: {
        width: 1,
      },
    },
  ],
};

const Lines = (props) => {
  const { width, height, yName, yData } = props;
  const divEL = useRef(null);
  const option = structuredClone(baseOption);
  option.series.push({
    name: yName,
    data: yData,
    type: "line",
    smooth: true,
    symbol: "circle",
    showAllSymbol: false,
    itemStyle: {
      color: 'red',
    },
    lineStyle: {
      color: "red",
      width: 2,
    },
  });

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
  }, [option]);

  return <div ref={divEL} style={{ width, height }}></div>;
};

const YYY2 = () => {
  return (
    <div>
      <Lines
        width={"100vw"}
        height={"300px"}
        yName="10cm湿度(kg/m2)"
        yData={yyy2["10cm湿度(kg/m2)"]}
      />
      <Lines
        width={"100vw"}
        height={"300px"}
        yName="40cm湿度(kg/m2)"
        yData={yyy2["40cm湿度(kg/m2)"]}
      />
      <Lines
        width={"100vw"}
        height={"300px"}
        yName="100cm湿度(kg/m2)"
        yData={yyy2["100cm湿度(kg/m2)"]}
      />
      <Lines
        width={"100vw"}
        height={"300px"}
        yName="200cm湿度(kg/m2)"
        yData={yyy2["200cm湿度(kg/m2)"]}
      />
    </div>
  );
};

export default YYY2;
