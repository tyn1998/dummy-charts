import "./App.css";
import ScatterTimeline from "./dummyCharts/ScatterTimeline/ScatterTimeline";

function App() {
  return (
    <div className="App">
      <h1 className="header">Dummy Charts Demos</h1>
      <h1>1. 时序散点图</h1>
      <div className="demo-box">
        <div className="chart-box">
          <ScatterTimeline theme="light" width={"100rem"} height={"53rem"} />
        </div>
      </div>
    </div>
  );
}

export default App;
