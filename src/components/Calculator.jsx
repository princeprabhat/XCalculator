import { useState } from "react";
import { buttonArr } from "./constants";

export default function Calculator() {
  const [displayValue, setDisplayValue] = useState("");
  const [result, setResult] = useState("");

  function checkValue(val) {
    const expression = ["+", "-", "*", "/"];
    const lastVal = val.split("")[val.length - 1];
    if (lastVal.toLowerCase() == "c") {
      setDisplayValue("");
      setResult("");
      return;
    }
    if (!buttonArr.includes(lastVal)) {
      return;
    }
    if (lastVal == "=") {
      if (displayValue == "") {
        setResult("Error");
        return;
      }
      if (expression.includes(displayValue[displayValue.length - 1])) {
        setResult(eval(displayValue.slice(0, displayValue.length - 1)));
        setDisplayValue((prev) => prev.slice(0, prev.length - 1));
      } else {
        setResult(eval(displayValue));
      }
      return;
    }
    if (
      expression.includes(lastVal) &&
      expression.includes(val.split("")[val.length - 2])
    ) {
      return;
    }

    setDisplayValue(val);
  }
  return (
    <div className="container">
      <h1>React Calculator</h1>
      <input
        type="text"
        value={displayValue}
        onChange={(e) => checkValue(e.target.value)}
      />
      <div>{result}</div>
      <div
        className="button-container"
        onClick={(e) => {
          e.stopPropagation();
          if (e.target.textContent == "C") {
            setDisplayValue("");
            setResult("");
            return;
          }
          if (e.target.localName == "button")
            checkValue(displayValue + e.target.textContent);
        }}
      >
        {buttonArr.map((el, idx) => {
          return <button key={idx}>{el}</button>;
        })}
      </div>
    </div>
  );
}
