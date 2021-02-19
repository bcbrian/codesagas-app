import {
  fireEvent,
  render,
  screen
} from "@testing-library/react";
import App from "./App";

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

function getByTextLowercase(str) {
  const reg = RegExp(str, "i");
  return screen.getByText(reg);
}

test("user can start a mini test", () => {
  //arrange
  render(<App quiz={quiz} />);

  //act

  //assert
  const titleElement = getByTextLowercase(
    quiz.title
  );
  const subtitleElement = getByTextLowercase(
    quiz.subtitle
  );
  const startButtonElement = getByTextLowercase(
    quiz.startButtonText
  );

  expect(
    titleElement
  ).toBeInTheDocument();
  expect(
    subtitleElement
  ).toBeInTheDocument();
  expect(
    startButtonElement
  ).toBeInTheDocument();

  //act
  fireEvent.click(startButtonElement);

  //assert
  const q1Text = getByTextLowercase(
    quiz.questions[0].question
  );
  const q1Option1 = getByTextLowercase(
    quiz.questions[0].options[0].text
  );
  const q1Option2 = getByTextLowercase(
    quiz.questions[0].options[1].text
  );
  const q1Option3 = getByTextLowercase(
    quiz.questions[0].options[2].text
  );
  const q1Option4 = getByTextLowercase(
    quiz.questions[0].options[3].text
  );
  expect(q1Text).toBeInTheDocument();
  expect(q1Option1).toBeInTheDocument();
  expect(q1Option2).toBeInTheDocument();
  expect(q1Option3).toBeInTheDocument();
  expect(q1Option4).toBeInTheDocument();
});
