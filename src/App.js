import React from "react";
import { useEffect, useState } from "react";

const url = "http://demo1030918.mockable.io";

function App() {
  const [gameMode, setGameMode] = useState({});
  const [fieldSize, setFieldSize] = useState();

  // fetch modes
  const getGameMode = () => {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => setGameMode(data));
  };
  useEffect(() => {
    getGameMode();
  }, []);

  const modeNamesArr = Object.entries(gameMode);
  const modeName = modeNamesArr.map((el) => <div key={el[0]}>{el[0]}</div>);

  const handleModeTypeChange = (e) => {
    let fieldSizeNum = Object.values(gameMode[e.target.value]);
    setFieldSize(fieldSizeNum[0]);
  };

  return (
    <div className="App">
      {modeName}
      {fieldSize}
      <select onChange={(e) => handleModeTypeChange(e)}>
        {modeNamesArr.map((element) => (
          <option key={element[0]} value={element[0]}>
            {element[0]}
          </option>
        ))}
      </select>
    </div>
  );
}

export default App;
