import React, { useState, useEffect, useRef } from "react";
import * as echarts from "echarts";

const option = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: "line",
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
