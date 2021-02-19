import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
const quiz = {
  title: "Quiz Title",
  subtitle:
    "The longer subtitle for the quiz.",
  startButtonText: "start quiz",
  questions: [
    {
      question:
        "a is the correct answer",
      type: "multiple choice", // store this and reference this...
      options: [
        {
          text: "a",
          isCorrect: true
        },
        {
          text: "b",
          isCorrect: true
        },
        {
          text: "c",
          isCorrect: true
        },
        {
          text: "d",
          isCorrect: true
        }
      ]
    }
  ]
};
ReactDOM.render(
  <React.StrictMode>
    <App quiz={quiz} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
