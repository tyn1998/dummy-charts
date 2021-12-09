import React, { useState, useEffect, useRef } from "react";
import * as echarts from "echarts";
import data from "./data.json";
import db_meta_json from "./db_meta.json";

const db_meta = db_meta_json.meta;

const EVENT_MAX_VALUES = {
  "WatchEvent": 10500, //10250
  "CreateEvent": 7500, //7256
  "PushEvent": 19000, //18935
  "MemberEvent": 20, //15
  "PullRequestEvent": 25500, //25062
  "ForkEvent": 4500, //4344
  "DeleteEvent": 4500, //4350
  "IssueCommentEvent": 41000, //40343
  "CommitCommentEvent": 1500, //1405
  "PullRequestReviewCommentEvent": 23000, //22599
  "IssuesEvent": 7500, //7240
  "GollumEvent": 250, //234
  "ReleaseEvent": 250, //237
}

const ScatterTimeline = (props) => {
  const { theme, width, height } = props;
  const divEL = useRef(null);

  const [currentEventType, setCurrentEventType] = useState(data.series_meta[0]);

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
  }, [currentEventType]);

  const onSelectEventType = (e) => {
    let chosenEventType = e.target.value;
    console.log(`切换到event_type为${chosenEventType}的时序散点图`);
    setCurrentEventType(chosenEventType);
  };

  var itemStyle = {
    opacity: 0.8,
  };
  var sizeFunction = function (x) {
    var y = Math.sqrt(x / 5e8) + 0.1;
    return y * 80;
  };

  let maxY = 0;

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
          text: "标题还没确定",
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
          return "hi" + value[0];
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
        logBase: 10,
        min: 1,
        max: 500,
        name: 'db_engines_ranking_trend_popularity',
        nameGap: 25,
        nameLocation: "middle",
        nameTextStyle: {
          fontSize: 26,
        },
        axisLine: {
          symbol: ['none', 'arrow']
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
        logBase: 10,
        min: 10,
        max: EVENT_MAX_VALUES[currentEventType],
        name: currentEventType,
        nameLocation: 'middle',
        nameGap: 50,
        nameTextStyle: {
          fontSize: 26,
        },
        axisLine: {
          symbol: ['none', 'arrow']
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          formatter: "{value}",
        },
      },
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
                if (db_meta[i][0] == params.value[14]) {
                  commonName = db_meta[i][1];
                  break;
                }
              }
              return commonName;
            },
          },
          dimensions: [
            "WatchEvent",
            "CreateEvent",
            "PushEvent",
            "MemberEvent",
            "PullRequestEvent",
            "ForkEvent",
            "DeleteEvent",
            "IssueCommentEvent",
            "CommitCommentEvent",
            "PullRequestReviewCommentEvent",
            "IssuesEvent",
            "GollumEvent",
            "ReleaseEvent",
            "db_engines_ranking_trend_popularity",
            "db_repo_full_name",
          ],
          encode: {
            x: "db_engines_ranking_trend_popularity",
            y: currentEventType
          },
          data: data.series[0],
          symbol: (params) => {
            let logoFileName = "";
            for (let i = 0; i < db_meta.length; i++) {
              if (db_meta[i][0] == params[14]) {
                logoFileName = db_meta[i][2];
                break;
              }
            }
            // return "image://http://localhost:9888/" + logoFileName;
            return "image://db_logos/" + logoFileName;
          },
          symbolSize: function (val) {
            // return sizeFunction(val[2]);
            return 80;
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
        dimensions: [
          "WatchEvent",
          "CreateEvent",
          "PushEvent",
          "MemberEvent",
          "PullRequestEvent",
          "ForkEvent",
          "DeleteEvent",
          "IssueCommentEvent",
          "CommitCommentEvent",
          "PullRequestReviewCommentEvent",
          "IssuesEvent",
          "GollumEvent",
          "ReleaseEvent",
          "db_engines_ranking_trend_popularity",
          "db_repo_full_name",
        ],
        encode: {
          x: "db_engines_ranking_trend_popularity",
          y: currentEventType
        },
        data: data.series[n],
        // symbolSize: function (val) {
        //   return sizeFunction(val[2]);
        // },
      },
    });
  }

  return (
    <div>
      <div className="locale-selector">
        <select onChange={onSelectEventType} defaultValue={currentEventType}>
          {data.series_meta.map((eventType) => (
            <option key={eventType} value={eventType}>
              {eventType}
            </option>
          ))}
        </select>
      </div>
      <div ref={divEL} style={{ width, height }}></div>
    </div>
  );
};

export default ScatterTimeline;
