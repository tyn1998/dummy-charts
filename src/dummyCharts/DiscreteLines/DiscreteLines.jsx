import React, { useState, useEffect, useRef } from "react";
import * as echarts from "echarts";
import yyyData from "./yyy.json";

const generateData = () => {
  // (0.9092...17-0j) -> 0.9092...17
  const parseNumber = (complex) => {
    const result = parseFloat(complex.slice(1, -2));
    return result;
  };
  const y = [],
    y1 = [],
    y2 = [],
    y3 = [];
  for (let i = 1; i < yyyData.length; i++) {
    const yv = parseNumber(yyyData[i]["y_true"]);
    let y1v = parseNumber(yyyData[i]["y_last_1"]);
    let y2v = parseNumber(yyyData[i]["y_last_2"]);
    let y3v = parseNumber(yyyData[i]["y_last_3"]);
    if (yv === y1v && y1v === y2v && y2v === y3v) {
      y1v = null;
      y2v = null;
      y3v = null;
    }
    y.push([i + 1, yv]);
    y1.push([i + 1, y1v]);
    y2.push([i + 1, y2v]);
    y3.push([i + 1, y3v]);
  }
  return {
    y,
    y1,
    y2,
    y3,
  };
};

const data = generateData();

const option = {
  xAxis: {
    type: "value",
  },
  yAxis: {
    type: "value",
  },
  legend: {},
  dataZoom: [{
    type: 'slider',
  }],
  series: [
    {
      name: 'y_true',
      data: data.y,
      type: "line",
      smooth: true,
      symbol: 'circle',
    },
    {
      name: 'y_last_1',
      data: data.y1,
      type: "line",
      smooth: true,
      symbol: 'circle'
    },
    {
      name: 'y_last_2',
      data: data.y2,
      type: "line",
      smooth: true,
      symbol: 'circle'
    },
    {
      name: 'y_last_3',
      data: data.y3,
      type: "line",
      smooth: true,
      symbol: 'circle'
    },
  ],
};

const DiscreteLines = (props) => {
  const { width, height } = props;
  const divEL = useRef(null);

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
  }, []);

  return <div ref={divEL} style={{ width, height }}></div>;
};

export default DiscreteLines;
