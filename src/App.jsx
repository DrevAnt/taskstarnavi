import React from "react";
import { useEffect, useState } from "react";
import "./App.css";

const url = "http://demo1030918.mockable.io";

function App() {
  const optionNames = ["Pick mode"];
  const [gameMode, setGameMode] = useState({});
  const [fieldSize, setFieldSize] = useState(0);
  const [gameField, setGameField] = useState(0);
  const [selectedOption, setSelectedOption] = useState(optionNames[0]);
  const [print, setPrint] = useState();

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
            <div
              onMouseOver={changeBackground}
              id={index}
              key={index}
              className="gameBox"
            >
              {el}
            </div>
          ))
        );
  };
  console.log("gameField:", gameField);

  // Handle hover effect
  const changeBackground = (e) => {
    // Print rows and columns
    let row = Math.floor(e.target.id / fieldSize + 1);
    console.log("e.target.id:", e.target.id, "row:", row);
    let column =
      e.target.id == 0 ? 1 : ((+e.target.id + +fieldSize) % +fieldSize) + 1;
    console.log("column:", column);
    // Info to print
    const toPrint = { Row: row, Column: column };
    const arrOfToPrint = [];
    arrOfToPrint.push(toPrint);

    if (e.target.className == "gameBox") {
      e.target.className = "gameBoxActive";
      setPrint(
        arrOfToPrint.map((el) => <p key={Math.random()}>{el.toString()}</p>)
      );
    } else {
      e.target.className = "gameBox";
    }
  };

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
      <div className="aside">
        <p>Hovered squares</p>
        {print}
      </div>
    </div>
  );
}

export default App;
