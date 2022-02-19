import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import Aside from "./components/Aside/Aside";

const url = "http://demo1030918.mockable.io";

function App() {
  const optionNames = ["Pick mode"];
  const [gameMode, setGameMode] = useState({});
  const [fieldSize, setFieldSize] = useState(0);
  const [gameField, setGameField] = useState(0);
  const [selectedOption, setSelectedOption] = useState(optionNames[0]);

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
  console.log("modeNamesArr:", modeNamesArr);

  // New array for selected options with custom select option
  let modeNames = modeNamesArr.map((el) =>
    el[0]
      .split(/(?=[A-Z])/)
      .join(" ")
      .toLowerCase()
  );
  // Push to array with select options and UpperCase first letter
  modeNames.map((el) =>
    optionNames.push(el[0].toUpperCase() + el.slice(1).toLowerCase())
  );

  // Handle select, pass field size
  let fieldSizeNum = Object.values(gameMode);
  fieldSizeNum = fieldSizeNum.map((el) => Object.values(el));
  console.log("fieldSizeNum:", fieldSizeNum);

  const handleModeTypeChange = (e) => {
    // Clear fields
    setGameField(0);

    // Pick mode
    switch (e.target.value) {
      case "Pick mode":
        setFieldSize(0);
        break;
      case "Easy mode":
        setFieldSize(fieldSizeNum[0]);
        break;
      case "Normal mode":
        setFieldSize(fieldSizeNum[1]);
        break;
      case "Hard mode":
        setFieldSize(fieldSizeNum[2]);
        break;
      default:
        setFieldSize(5);
    }

    // Set selected option-name
    setSelectedOption(e.target.value);
    console.log("selected option name:", e.target.value);
  };

  // Handle start button
  const handleStart = () => {
    // Creating array of empty elem for field
    let fieldArray = Array.from({ length: fieldSize * fieldSize });
    console.log("fieldArray:", fieldArray);

    // Clear game if "pick mode" or set Game Field
    setSelectedOption === "Pick mode"
      ? setGameField(0)
      : setGameField(
          fieldArray.map((el, index) => (
            <div key={index} className="gameBox">
              {el}
            </div>
          ))
        );
  };
  console.log("gameField:", gameField);

  return (
    <div className="App">
      {fieldSize}
      <p>Pick mode and press start</p>

      <select value={selectedOption} onChange={(e) => handleModeTypeChange(e)}>
        {optionNames.map((element, index) => (
          <option key={element[index]} value={element.value}>
            {element}
          </option>
        ))}
      </select>
      <button onClick={handleStart}>START</button>

      <div
        className="flexField"
        style={
          fieldSize > 0
            ? { width: `${fieldSize * 2.2}rem` }
            : { display: "none" }
        }
      >
        {gameField !== 0 ? gameField : ""}
      </div>
      <div className="aside"></div>
    </div>
  );
}

export default App;
