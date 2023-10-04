import logo from "./logo.svg";
import "./App.css";
import React from "react";

function App() {
  const [time, setTime] = React.useState(0);
  const [start, setStart] = React.useState(false);
  const [laps, setLaps] = React.useState([]);

  React.useEffect(() => {
    if (start) {
      const interval = setInterval(() => setTime(time + 1), 10);
      return () => {
        clearInterval(interval);
      };
    }
  }, [time, start]);

  const handleReset = () => {
    setStart(false);
    setTime(0);
    setLaps([]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ width: "100%" }}>
          <h1>{`${String(Math.floor(time / 6000)).padStart(2, "0")}:${String(
            Math.floor(time / 100) < 60
              ? Math.floor(time / 100)
              : Math.floor(time / 100) % 60
          ).padStart(2, "0")}.${String(time < 100 ? time : time % 100).padStart(
            2,
            "0"
          )}`}</h1>
          <div className="stack">
            <button
              id="start"
              className="stack-btn"
              onClick={() => setStart(true)}
            >
              Start
            </button>
            <button className="stack-btn" onClick={() => handleReset()}>
              Reset
            </button>
            <button
              id="stop"
              className="stack-btn"
              onClick={() => setStart(false)}
            >
              Stop
            </button>
          </div>
          <div className="stack">
            <button
              className="stack-btn"
              onClick={() =>
                setLaps([
                  ...laps,
                  time - laps.reduce((acc, val) => acc + val, 0),
                ])
              }
            >
              Lap
            </button>
          </div>
        </div>
        <h5>Laps</h5>
        <div id="laps-container">
          <ol>
            {laps.map((lap) => (
              <li>{`${String(Math.floor(lap / 6000)).padStart(2, "0")}:${String(
                Math.floor(lap / 100) < 60
                  ? Math.floor(lap / 100)
                  : Math.floor(lap / 100) % 60
              ).padStart(2, "0")}.${String(
                lap < 100 ? lap : lap % 100
              ).padStart(2, "0")}`}</li>
            ))}
          </ol>
        </div>
      </header>
    </div>
  );
}

export default App;
