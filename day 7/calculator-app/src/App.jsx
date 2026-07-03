import { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("");

  const handleClick = (value) => {
    setDisplay(display + value);
  };

  const clearDisplay = () => {
    setDisplay("");
  };

  const deleteLast = () => {
    setDisplay(display.slice(0, -1));
  };

  const calculate = () => {
    try {
      setDisplay(eval(display).toString());
    } catch {
      setDisplay("Error");
    }
  };

  const buttons = [
    "AC", "DEL", "%", "/",
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "="
  ];

  return (
    <div className="container">
      <div className="calculator">

        <input
          type="text"
          value={display}
          readOnly
          className="display"
        />

        <div className="buttons">
          {buttons.map((btn) => (
            <button
              key={btn}
              className={
                btn === "="
                  ? "equal"
                  : btn === "AC"
                  ? "clear"
                  : btn === "DEL"
                  ? "delete"
                  : ["+", "-", "*", "/", "%"].includes(btn)
                  ? "operator"
                  : ""
              }
              onClick={() => {
                if (btn === "AC") clearDisplay();
                else if (btn === "DEL") deleteLast();
                else if (btn === "=") calculate();
                else handleClick(btn);
              }}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;