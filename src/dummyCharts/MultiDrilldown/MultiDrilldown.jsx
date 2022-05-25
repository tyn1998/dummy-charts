import React, { useEffect, useRef, useMemo } from "react";
import * as echarts from "echarts";

const MultiDrilldown = (props) => {
  const { width, height } = props;

  const divEL = useRef(null);

  useEffect(() => {
    // level 1
    const data_1 = {
      dataGroupId: "1", // In root level, this field dosen't matter
      data: [
        ["1_1", 5, "1_1"], // x, y, groupId
        ["1_2", 2, "1_2"],
      ],
    };

    // level 2
    const data_1_1 = {
      dataGroupId: "1_1",
      data: [
        ["1_1_1", 2, "1_1_1"],
        ["1_1_2", 2, "1_1_2"],
        ["1_1_3", 3, "1_1_3"],
      ],
    };

    const data_1_2 = {
      dataGroupId: "1_2",
      data: [
        ["1_2_1", 6, "1_2_1"],
        ["1_2_2", 7, "1_2_2"],
      ],
    };

    // level 3
    const data_1_1_1 = {
      dataGroupId: "1_1_1",
      data: [
        ["1_1_1_A", 5],
        ["1_1_1_B", 6],
        ["1_1_1_C", 7],
        ["1_1_1_D", 8],
      ],
    };

    const data_1_1_2 = {
      dataGroupId: "1_1_2",
      data: [
        ["1_1_2_A", 2],
        ["1_1_2_B", 9],
      ],
    };

    const data_1_1_3 = {
      dataGroupId: "1_1_3",
      data: [
        ["1_1_3_A", 1],
        ["1_1_3_B", 2],
        ["1_1_3_C", 8],
      ],
    };

    const data_1_2_1 = {
      dataGroupId: "1_2_1",
      data: [
        ["1_2_1_A", 9],
        ["1_2_1_B", 2],
        ["1_2_1_C", 1],
      ],
    };

    const data_1_2_2 = {
      dataGroupId: "1_2_2",
      data: [
        ["1_2_2_A", 7],
        ["1_2_2_B", 7],
      ],
    };

    const allDataGroups = [
      data_1,
      data_1_1,
      data_1_2,
      data_1_1_1,
      data_1_1_2,
      data_1_1_3,
      data_1_2_1,
      data_1_2_2,
    ];

    const allOptions = {};

    allDataGroups.forEach((dataGroup, index) => {
      const { dataGroupId, data } = dataGroup;
      const option = {
        xAxis: {
          type: "category",
        },
        yAxis: {},
        dataGroupId: dataGroupId,
        animationDurationUpdate: 500,
        series: {
          type: "bar",
          // id: "sales",
          encode: {
            x: 0,
            y: 1,
            itemGroupId: 2,
          },
          data: data,
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
              goBack();
            },
          },
        ],
      };
      allOptions[dataGroupId] = option;
    });

    // A stack to remember previous dataGroups
    const dataGroupIdStack = [];

    const goForward = (dataGroupId) => {
      let chartDOM = divEL.current;
      let instance = echarts.getInstanceByDom(chartDOM);
      dataGroupIdStack.push(instance.getOption().dataGroupId); // push current dataGroupId into stack.
      instance.setOption(allOptions[dataGroupId]);
    };

    const goBack = () => {
      if (dataGroupIdStack.length === 0) {
        console.log("Already in root dataGroup!");
      } else {
        console.log("Go back to previous level");
        let chartDOM = divEL.current;
        let instance = echarts.getInstanceByDom(chartDOM);
        instance.setOption(allOptions[dataGroupIdStack.pop()]);
      }
    };

    let chartDOM = divEL.current;
    let instance = echarts.getInstanceByDom(chartDOM);
    if (!instance) {
      instance = echarts.init(chartDOM);
      instance.on("click", "series.bar", (params) => {
        if (params.data[2]) {
          const dataGroupId = params.data[2];
          goForward(dataGroupId);
        }
      });
    }
    instance.setOption(allOptions["1"]); // show root group (dataGroupId = 1) when init.

    return () => {
      instance.dispose();
    };
  }, []);

  return <div ref={divEL} style={{ width, height }}></div>;
};

export default MultiDrilldown;
