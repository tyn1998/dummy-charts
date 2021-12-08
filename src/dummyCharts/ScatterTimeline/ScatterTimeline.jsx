import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import data from "./data.json";
import db_meta_json from "./db_meta.json";

const db_meta = db_meta_json.meta;

const ScatterTimeline = (props) => {
  const { theme, width, height } = props;
  const divEL = useRef(null);

  var itemStyle = {
    opacity: 0.8,
  };
  var sizeFunction = function (x) {
    var y = Math.sqrt(x / 5e8) + 0.1;
    return y * 80;
  };
  // Schema:
  var schema = [
    { name: "Income", index: 0, text: "人均收入", unit: "美元" },
    { name: "LifeExpectancy", index: 1, text: "人均寿命", unit: "岁" },
    { name: "Population", index: 2, text: "总人口", unit: "" },
    { name: "Country", index: 3, text: "国家", unit: "" },
  ];
  const option = {
    baseOption: {
      timeline: {
        axisType: "category",
        orient: "vertical",
        autoPlay: true,
        inverse: false,
        playInterval: 1000,
        left: null,
        right: 0,
        top: 20,
        bottom: 20,
        width: 55,
        height: null,
        symbol: "none",
        checkpointStyle: {
          borderWidth: 2,
        },
        controlStyle: {
          showNextBtn: false,
          showPrevBtn: false,
        },
        data: [],
      },
      title: [
        {
          text: data.timeline[0],
          textAlign: "center",
          left: "20%",
          top: "12%",
          textStyle: {
            fontSize: 70,
          },
        },
        {
          text: "DBMS OSS activity-popularity log-log distribution",
          subtext: "Sampled from: DB-Engines October XXX & GitHub logs XXX",
          left: "left",
          top: 10,
          textStyle: {
            fontWeight: "normal",
            fontSize: 20,
          },
        },
      ],
      tooltip: {
        padding: 5,
        borderWidth: 1,
        formatter: function (obj) {
          var value = obj.value;
          // prettier-ignore
          return schema[3].text + '：' + value[3] + '<br>'
                        + schema[1].text + '：' + value[1] + schema[1].unit + '<br>'
                        + schema[0].text + '：' + value[0] + schema[0].unit + '<br>'
                        + schema[2].text + '：' + value[2] + '<br>';
        },
      },
      grid: {
        top: 100,
        containLabel: true,
        left: 30,
        right: "110",
      },
      xAxis: {
        type: "log",
        logBase: 2,
        min: 1,
        name: "Activity",
        nameGap: 25,
        nameLocation: "middle",
        nameTextStyle: {
          fontSize: 18,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          formatter: "{value}",
        },
      },
      yAxis: {
        type: "log",
        logBase: 2,
        min: 1,
        name: "Popularity",
        nameTextStyle: {
          fontSize: 18,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          formatter: "{value}",
        },
      },
      // visualMap: [
      //   {
      //     show: false,
      //     dimension: 2, //对应的第几维数据
      //     categories: data.dbnames,
      //     inRange: {
      //       color: (function () {
      //         // prettier-ignore
      //         var colors = ['#51689b', '#ce5c5c', '#fbc357', '#8fbf8f', '#659d84', '#fb8e6a', '#c77288', '#786090', '#91c4c5', '#6890ba'];
      //         return colors.concat(colors);
      //       })(),
      //     },
      //   },
      // ],
      series: [
        {
          type: "scatter",
          itemStyle: itemStyle,
          label: {
            show: true,
            position: "top",
            formatter: (params) => {
              let commonName = "";
              for (let i = 0; i < db_meta.length; i++) {
                if (db_meta[i][0] == params.value[2]) {
                  commonName = db_meta[i][1];
                  break;
                }
              }
              return commonName;
            },
          },
          data: data.series[0],
          symbol: (params) => {
            let logoFileName = "";
            for (let i = 0; i < db_meta.length; i++) {
              if (db_meta[i][0] == params[2]) {
                logoFileName = db_meta[i][2];
                break;
              }
            }
            // return "image://http://localhost:9888/" + logoFileName;
            return "image://db_logos/" + logoFileName;
          },
          symbolSize: function (val) {
            // return sizeFunction(val[2]);
            return 50;
          },
        },
      ],
      animationDurationUpdate: 1000,
      animationEasingUpdate: "quinticInOut",
    },
    options: [],
  };
  for (var n = 0; n < data.timeline.length; n++) {
    option.baseOption.timeline.data.push(data.timeline[n]);
    option.options.push({
      title: {
        show: true,
        text: data.timeline[n] + "",
      },
      series: {
        name: data.timeline[n],
        type: "scatter",
        itemStyle: itemStyle,
        data: data.series[n],
        // symbolSize: function (val) {
        //   return sizeFunction(val[2]);
        // },
      },
    });
  }

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
    // const option = generateOption(theme, indicators, maxScales, values);
    instance.setOption(option);
    console.log("Echarts option (set)updated.");
  }, []);

  return <div ref={divEL} style={{ width, height }}></div>;
};

export default ScatterTimeline;
