import React from "react";
import { useEffect, useState } from "react";

const url = "http://demo1030918.mockable.io";

function App() {
  const [gameMode, setGameMode] = useState({});

  // fetch modes
  const getGameMode = () => {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => setGameMode(data));
  };
  useEffect(() => {
    getGameMode();
  }, []);

  const jsonString = JSON.stringify(gameMode);
  console.log(Object.values(gameMode));
  let result = Object.entries(gameMode);
  let toPrint = result.map((el) => <li>{el[0]}</li>);

  console.log(result);

  return (
    <div className="App">
      <div>{jsonString}</div>
      <div>{toPrint}</div>
    </div>
  );
}

export default App;
