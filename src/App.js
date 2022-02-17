import React from "react";
import { useEffect, useState } from "react";
import "./App.css";

const url = "http://demo1030918.mockable.io";

function App() {
  const [gameMode, setGameMode] = useState({});
  const [fieldSize, setFieldSize] = useState();

  // Fetch modes
  const getGameMode = () => {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => setGameMode(data));
  };
  useEffect(() => {
    getGameMode();
  }, []);

  // Get game mode names
  const modeNamesArr = Object.entries(gameMode);
  const modeName = modeNamesArr.map((el) => <div key={el[0]}>{el[0]}</div>);

  // Handle select, pass field size
  const handleModeTypeChange = (e) => {
    let fieldSizeNum = Object.values(gameMode[e.target.value]);
    setFieldSize(fieldSizeNum[0]);
  };

  // Creating array of empty elem for field
  let fieldArray = Array.from({ length: fieldSize * fieldSize });
  // Creating future field boxes
  let filledFieldElements = fieldArray.map((el, index) => (
    <div key={index} className="gameBox">
      {el}
    </div>
  ));

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

      <div className="flexField">{filledFieldElements}</div>
    </div>
  );
}

export default App;
