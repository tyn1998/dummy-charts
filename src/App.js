import "./App.css";
import ScatterTimeline from "./dummyCharts/ScatterTimeline/ScatterTimeline";
import MultiDrilldown from "./dummyCharts/MultiDrilldown/MultiDrilldown";
import YYY2 from "./dummyCharts/YYY/YYY2.jsx";

function App() {
  return (
    <div className="App">
      {/* <h1 className="header">Dummy Charts Demos</h1> */}
      {/* <h1>1. 时序散点图</h1> */}
      {/* <div className="demo-box"> */}
      {/*   <div className="chart-box"> */}
      {/*     <ScatterTimeline theme="light" width={"1000px"} height={"500px"} /> */}
      {/*   </div> */}
      {/* </div> */}

      {/* <h1>2. 多级下钻图</h1> */}
      {/* <div className="demo-box"> */}
      {/*   <div className="chart-box"> */}
      {/*     <MultiDrilldown width={"100vw"} height={"500px"} /> */}
      {/*   </div> */}
      {/* </div> */}

      <h1>YYY2</h1>
      <YYY2 />
    </div>
  );
}

export default App;
