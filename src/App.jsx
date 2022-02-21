import React from "react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
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
  // console.log("modeNamesArr:", modeNamesArr);

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
  // console.log("fieldSizeNum:", fieldSizeNum);

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
    // console.log("selected option name:", e.target.value);

    // Clear aside div info
    setPrint("");
  };

  // Handle start button
  let fieldArray = [];
  const handleStart = () => {
    // Creating array of empty elem for field
    fieldArray = Array.from({ length: fieldSize * fieldSize });
    // console.log("fieldArray:", fieldArray);

    // Clear game if "pick mode" or set Game Field
    setSelectedOption === "Pick mode"
      ? setGameField(0)
      : setGameField(
          fieldArray.map((el, index) => (
            <div
              onMouseOver={changeBackground}
              id={index}
              key={uuidv4()}
              className="gameBox"
            >
              {el}
            </div>
          ))
        );
  };
  // console.log("gameField:", gameField);

  // Handle hover effect
  const arrOfToPrint = [];
  const changeBackground = (e) => {
    // Print rows and columns
    let row = Math.floor(e.target.id / fieldSize + 1);
    // console.log("e.target.id:", e.target.id, "row:", row);
    let column =
      e.target.id == 0 ? 1 : ((+e.target.id + +fieldSize) % +fieldSize) + 1;
    // console.log("column:", column);

    // Info to print
    const toPrint = { Row: row, Column: column };

    if (e.target.className == "gameBox") {
      e.target.className = "gameBoxActive";
      arrOfToPrint.push(toPrint);
      console.log("arrOfToPrint:", arrOfToPrint);
      setPrint(
        arrOfToPrint.map((el) => (
          <p className="textPrinted" key={uuidv4()}>
            {JSON.stringify(el)
              .replace(/['"]+/g, "")
              .replace(/[{}]/g, "")
              .replaceAll(",", " ")}
          </p>
        ))
      );
    } else {
      e.target.className = "gameBox";
      let deleteInfo = (el) => {
        el.row == row && el.column == column ? el : null;
      };
      let result = arrOfToPrint.findIndex(deleteInfo);
      arrOfToPrint.splice(result, 1);
      setPrint(
        arrOfToPrint.map((el) => (
          <p className="textPrinted" key={uuidv4()}>
            {JSON.stringify(el)
              .replace(/['"]+/g, "")
              .replace(/[{}]/g, "")
              .replaceAll(",", " ")}
          </p>
        ))
      );
    }
  };

  return (
    <div className="App">
      <div className="wrapper">
        <div className="game">
          <h2>Pick mode and press start</h2>

          <select
            value={selectedOption}
            onChange={(e) => handleModeTypeChange(e)}
          >
            {optionNames.map((element) => (
              <option key={uuidv4()} value={element.value}>
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
        </div>

        <div className="aside">
          <h2>Hovered squares</h2>
          {print}
        </div>
      </div>
    </div>
  );
}

export default App;
