import React from "react";
import { useEffect, useState } from "react";
import "./App.css";

const url = "http://demo1030918.mockable.io";

function App() {
  let optionNames = ["Pick mode"];
  const [gameMode, setGameMode] = useState({});
  const [fieldSize, setFieldSize] = useState();
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
  console.log(modeNamesArr);
  // New array for selected options with custom select option
  let modeNames = modeNamesArr.map((el) =>
    el[0]
      .split(/(?=[A-Z])/)
      .join(" ")
      .toLowerCase()
  );
  // Push to array with select options
  let upperCaseNames = modeNames.map((el) =>
    optionNames.push(el[0].toUpperCase() + el.slice(1).toLowerCase())
  );

  // Handle select, pass field size
  let fieldSizeNum = Object.values(gameMode);
  fieldSizeNum = fieldSizeNum.map((el) => Object.values(el));
  console.log(fieldSizeNum);
  const handleModeTypeChange = (e) => {
    switch (e.target.value) {
      case "Pick mode":
        console.log("Pick mode case");
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
    console.log(e.target.value);
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
      {fieldSize}

      <select value={selectedOption} onChange={(e) => handleModeTypeChange(e)}>
        {optionNames.map((element, index) => (
          <option key={element[index]} value={element.value}>
            {element}
          </option>
        ))}
      </select>

      <div className="flexField">{filledFieldElements}</div>
    </div>
  );
}

export default App;
