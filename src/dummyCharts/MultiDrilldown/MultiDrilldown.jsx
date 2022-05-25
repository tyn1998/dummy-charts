import React, { useEffect, useRef, useMemo } from "react";
import * as echarts from "echarts";

const MultiDrilldown = (props) => {
  const { width, height } = props;

  const divEL = useRef(null);

  useEffect(() => {
    const option = {
      xAxis: {
        data: ["Animals", "Fruits", "Cars"],
      },
      yAxis: {},
      dataGroupId: "",
      animationDurationUpdate: 500,
      series: {
        type: "bar",
        id: "sales",
        data: [
          {
            value: 5,
            groupId: "animals",
          },
          {
            value: 2,
            groupId: "fruits",
          },
          {
            value: 4,
            groupId: "cars",
          },
        ],
        universalTransition: {
          enabled: true,
          divideShape: "clone",
        },
      },
    };
    const drilldownData = [
      {
        dataGroupId: "animals",
        data: [
          ["Cats", 4],
          ["Dogs", 2],
          ["Cows", 1],
          ["Sheep", 2],
          ["Pigs", 1],
        ],
      },
      {
        dataGroupId: "fruits",
        data: [
          ["Apples", 4],
          ["Oranges", 2],
        ],
      },
      {
        dataGroupId: "cars",
        data: [
          ["Toyota", 4],
          ["Opel", 2],
          ["Volkswagen", 2],
        ],
      },
    ];

    let chartDOM = divEL.current;
    let instance = echarts.getInstanceByDom(chartDOM);
    if (!instance) {
      instance = echarts.init(chartDOM);
      instance.on("click", (params) => {
        if (params.data) {
          var subData = drilldownData.find(function (data) {
            return data.dataGroupId === params.data.groupId;
          });
          if (!subData) {
            return;
          }
          instance.setOption({
            xAxis: {
              data: subData.data.map(function (item) {
                return item[0];
              }),
            },
            series: {
              type: "bar",
              id: "sales",
              dataGroupId: subData.dataGroupId,
              data: subData.data.map(function (item) {
                return item[1];
              }),
              universalTransition: {
                enabled: true,
                divideShape: "clone",
              },
            },
            graphic: [
              {
                type: "text",
                left: 50,
                top: 20,
                style: {
                  text: "Back",
                  fontSize: 18,
                },
                onclick: function () {
                  instance.setOption(option);
                },
              },
            ],
          });
        }
      });
    }
    instance.setOption(option);

    return () => {
      instance.dispose();
    };
  }, []);

  return <div ref={divEL} style={{ width, height }}></div>;
};

export default MultiDrilldown;