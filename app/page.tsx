"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [Answer, SetAnswer] = useState("");
  const [Expression, SetExpression] = useState("")
  const Et = Expression.trim();
  const HandleClick = (Type: string) => {
    if (Type === "clear") {
      SetAnswer("");
      SetExpression("0");
    } else if (IsOperator(Type)) {
      SetExpression(Et + " " + Type + " ");
    } else if (Type === "=") {
      Calculate(Type);
    } else if (Type === "0") {
      if (Expression.charAt(0) !== "0") {
        SetExpression(Expression + Type)
      }
    } else if (Type === ".") {
      const LastNumber = Expression.split(/[-+/*]/g).pop();
      if (LastNumber?.includes(".")) return;
      SetExpression(Expression + Type);
    } else {
      if (Expression.charAt(0) === "0") {
        SetExpression(Expression.slice(1) + Type);
      } else {
        SetExpression(Expression + Type);
      }
    }
  }
  const Calculate = (Content: string) => {
    if (IsOperator(Et.charAt(Et.length - 1))) return;
    const Parts = Et.split(" ");
    console.log(Parts);
    const NewParts = [];

    for (let i = Parts.length - 1; i >= 0; i--) {
      if (["+", "*", "/"].includes(Parts[i]) && IsOperator(Parts[i - 1])) {
        NewParts.unshift(Parts[i]);
        let J = 0;
        let K = i - 1;
        while (IsOperator(Parts[K])) {
          K--;
          J++;
        }
        i -= J;
      } else {
        NewParts.unshift(Parts[i])
      }
    }
    const NewExpression = NewParts.join(" ")
    console.log(NewExpression);
    if (IsOperator(NewExpression.charAt(0))) {
      SetAnswer(eval(NewExpression + Answer) as string)
    } else {
      SetAnswer(eval(NewExpression) as string)
    }
  };
  const IsOperator = (Symbol: string) => {
    return /[*/+-]/.test(Symbol);
  }
  return (
    <>
      <h1 className={styles.h1}>JavaScript Calculator</h1>
      <div className={styles.calculator}>
        <div id="display">
          <div className={styles.face}>{Answer}</div>
          <div className={styles.consq}>{Expression}</div>
        </div>
        <div className={styles.maths}>
          <button onClick={() => HandleClick("clear")} id="clear" className={styles.clear}>AC</button>
          <button onClick={() => HandleClick("+")} id="add" className={styles.add}>+</button>
          <button onClick={() => HandleClick("-")} id="subtract" className={styles.subtract}>-</button>
          <button onClick={() => HandleClick("*")} id="multiply" className={styles.multiply}>x</button>
          <button onClick={() => HandleClick("/")} id="divide" className={styles.divide}>/</button>
          <button onClick={() => HandleClick("0")} id="zero" className={styles.zero}>0</button>
          <button onClick={() => HandleClick("1")} id="one" className={styles.one}>1</button>
          <button onClick={() => HandleClick("2")} id="two" className={styles.two}>2</button>
          <button onClick={() => HandleClick("3")} id="three" className={styles.three}>3</button>
          <button onClick={() => HandleClick("4")} id="four" className={styles.four}>4</button>
          <button onClick={() => HandleClick("5")} id="five" className={styles.five}>5</button>
          <button onClick={() => HandleClick("6")} id="six" className={styles.six}>6</button>
          <button onClick={() => HandleClick("7")} id="seven" className={styles.seven}>7</button>
          <button onClick={() => HandleClick("8")} id="eight" className={styles.eight}>8</button>
          <button onClick={() => HandleClick("9")} id="nine" className={styles.nine}>9</button>
          <button onClick={() => HandleClick("=")} id="equals" className={styles.equals}>=</button>
          <button onClick={() => HandleClick(".")} id="decimal" className={styles.decimal}>.</button>
        </div>
      </div>    
    </>
  )
}