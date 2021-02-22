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
          text: "b"
        },
        {
          text: "c"
        },
        {
          text: "d"
        }
      ]
    },
    {
      question:
        "a penny for your thoughts",
      type: "free form", // store this and reference this...
      label: "you do you"
    },
    {
      question:
        "a and c are the correct answers needs both",
      type: "multiple answer", // store this and reference this...
      options: [
        {
          text: "a",
          isCorrect: true
        },
        {
          text: "b"
        },
        {
          text: "c",
          isCorrect: true
        },
        {
          text: "d"
        }
      ]
    }
  ]
};

function getByTextLowercase(str) {
  const reg = RegExp(str, "i");
  return screen.getByText(reg);
}
function getByTitleLowercase(str) {
  const reg = RegExp(str, "i");
  return screen.getByTitle(reg);
}
function getByLabelLowercase(str) {
  const reg = RegExp(str, "i");
  return screen.getByLabelText(reg);
}

function startTheQuiz() {
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
}

function proceedToNextQuestion() {
  //assert

  const nextButtonElement = getByTextLowercase(
    "next"
  );

  expect(
    nextButtonElement
  ).toBeInTheDocument();

  //act
  fireEvent.click(nextButtonElement);
}

function getQuestionOne() {
  return {
    q1Text: getByTextLowercase(
      quiz.questions[0].question
    ),
    q1Option1: getByTitleLowercase(
      `choose option 1: ${quiz.questions[0].options[0].text}`
    ),
    q1Option2: getByTitleLowercase(
      `choose option 2: ${quiz.questions[0].options[1].text}`
    ),
    q1Option3: getByTitleLowercase(
      `choose option 3: ${quiz.questions[0].options[2].text}`
    ),
    q1Option4: getByTitleLowercase(
      `choose option 4: ${quiz.questions[0].options[3].text}`
    )
  };
}

function answerQuestionOne() {
  const {
    q1Option1
  } = getQuestionOne();

  fireEvent.click(q1Option1);
}

function getQuestionTwo() {
  return {
    q1Text: getByTextLowercase(
      quiz.questions[1].question
    ),
    q1Label: getByLabelLowercase(
      quiz.questions[1].label
    )
  };
}

function answerQuestionTwo() {
  const { q1Label } = getQuestionTwo();

  fireEvent.change(q1Label, {
    target: {
      value:
        "This is some good feedback!"
    }
  });
}

function getQuestionThree() {
  return {
    q3Text: getByTextLowercase(
      quiz.questions[2].question
    ),
    q3Option1: getByTitleLowercase(
      `choose option 1: ${quiz.questions[2].options[0].text}`
    ),
    q3Option2: getByTitleLowercase(
      `choose option 2: ${quiz.questions[2].options[1].text}`
    ),
    q3Option3: getByTitleLowercase(
      `choose option 3: ${quiz.questions[2].options[2].text}`
    ),
    q3Option4: getByTitleLowercase(
      `choose option 4: ${quiz.questions[2].options[3].text}`
    )
  };
}

function answerQuestionThree() {
  const {
    q3Option1,
    q3Option3
  } = getQuestionThree();

  fireEvent.click(q3Option1);
  fireEvent.click(q3Option3);
}

function getQuestion1Answer() {
  const q1Text = getByTextLowercase(
    quiz.questions[0].question
  );
  const q1Option1 = getByTitleLowercase(
    `Question ${0 + 1} answers is ${
      quiz.questions[0].options[0].text
    }`
  );
  expect(q1Text).toBeInTheDocument();
  expect(q1Option1).toBeInTheDocument();
}
function getQuestion2Answer() {
  const q3Text = getByTextLowercase(
    quiz.questions[1].question
  );

  const userInput = getByTitleLowercase(
    "You said: This is some good feedback!"
  );
  expect(q3Text).toBeInTheDocument();
  expect(userInput).toBeInTheDocument();
}
function getQuestion3Answer() {
  const q3Text = getByTextLowercase(
    quiz.questions[2].question
  );
  const q3Option1 = getByTitleLowercase(
    `Question ${2 + 1} answers is ${
      quiz.questions[2].options[0].text
    }`
  );
  const q3Option3 = getByTitleLowercase(
    `Question ${2 + 1} answers is ${
      quiz.questions[2].options[0].text
    }`
  );
  expect(q3Text).toBeInTheDocument();
  expect(q3Option1).toBeInTheDocument();
  expect(q3Option3).toBeInTheDocument();
}

test("user can start a mini test", () => {
  //arrange
  render(<App quiz={quiz} />);

  //act
  startTheQuiz();

  //assert
  const {
    q1Text,
    q1Option1,
    q1Option2,
    q1Option3,
    q1Option4
  } = getQuestionOne();

  expect(q1Text).toBeInTheDocument();
  expect(q1Option1).toBeInTheDocument();
  expect(q1Option2).toBeInTheDocument();
  expect(q1Option3).toBeInTheDocument();
  expect(q1Option4).toBeInTheDocument();
});

test("the user can submit answers to all the questions", () => {
  //arrange
  render(<App quiz={quiz} />);

  //act
  startTheQuiz();
  answerQuestionOne();
  proceedToNextQuestion();
  answerQuestionTwo();
  proceedToNextQuestion();
  answerQuestionThree();
  proceedToNextQuestion();
});

test("the user gets results when completed", () => {
  // arrange
  render(<App quiz={quiz} />);

  // act
  startTheQuiz();
  answerQuestionOne();
  proceedToNextQuestion();
  answerQuestionTwo();
  proceedToNextQuestion();
  answerQuestionThree();
  proceedToNextQuestion();

  // assert
  const restultTitle = getByTextLowercase(
    "Your results are in!"
  );
  expect(
    restultTitle
  ).toBeInTheDocument();
  const percentScore = getByTextLowercase(
    "100%"
  );
  expect(
    percentScore
  ).toBeInTheDocument();
  getQuestion1Answer();
  getQuestion2Answer();
  getQuestion3Answer();
});
test.todo(
  "the user gets accurate results when some are right and some are wrong."
);
