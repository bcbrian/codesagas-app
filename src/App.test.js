import {
  fireEvent,
  render,
  screen
} from "@testing-library/react";
import App from "./App";

const QUESTION_TYPES = {
  MULTIPLE_CHOICE: "multiple choice",
  FREE_FORM: "free form",
  MULTIPLE_ANSWER: "multiple answer"
};

const quiz = {
  title: "Quiz Title",
  subtitle:
    "The longer subtitle for the quiz.",
  startButtonText: "start quiz",
  questions: [
    {
      question:
        "a is the correct answer",
      type:
        QUESTION_TYPES.MULTIPLE_CHOICE,
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
      type: QUESTION_TYPES.FREE_FORM,
      label: "you do you"
    },
    {
      question:
        "a and c are the correct answers needs both",
      type:
        QUESTION_TYPES.MULTIPLE_ANSWER,
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

function getQuestion(question) {
  if (
    quiz.questions[question].type ===
    QUESTION_TYPES.MULTIPLE_CHOICE
  ) {
    return {
      qText: getByTextLowercase(
        quiz.questions[question]
          .question
      ),
      a: getByTitleLowercase(
        `choose option 1: ${quiz.questions[question].options[0].text}`
      ),
      b: getByTitleLowercase(
        `choose option 2: ${quiz.questions[question].options[1].text}`
      ),
      c: getByTitleLowercase(
        `choose option 3: ${quiz.questions[question].options[2].text}`
      ),
      d: getByTitleLowercase(
        `choose option 4: ${quiz.questions[question].options[3].text}`
      )
    };
  }
  if (
    quiz.questions[question].type ===
    QUESTION_TYPES.MULTIPLE_ANSWER
  ) {
    return {
      qText: getByTextLowercase(
        quiz.questions[question]
          .question
      ),
      a: getByTitleLowercase(
        `choose option 1: ${quiz.questions[question].options[0].text}`
      ),
      b: getByTitleLowercase(
        `choose option 2: ${quiz.questions[question].options[1].text}`
      ),
      c: getByTitleLowercase(
        `choose option 3: ${quiz.questions[question].options[2].text}`
      ),
      d: getByTitleLowercase(
        `choose option 4: ${quiz.questions[question].options[3].text}`
      )
    };
  }
  if (
    quiz.questions[question].type ===
    QUESTION_TYPES.FREE_FORM
  ) {
    return {
      q1Text: getByTextLowercase(
        quiz.questions[1].question
      ),
      q1Label: getByLabelLowercase(
        quiz.questions[1].label
      )
    };
  }
}

function answerQuestion(
  question,
  answers
) {
  if (
    quiz.questions[question].type ===
    QUESTION_TYPES.MULTIPLE_CHOICE
  ) {
    fireEvent.click(
      getQuestion(question)[answers]
    );
  }
  if (
    quiz.questions[question].type ===
    QUESTION_TYPES.FREE_FORM
  ) {
    const { q1Label } = getQuestion(
      question
    );

    fireEvent.change(q1Label, {
      target: {
        value:
          "This is some good feedback!"
      }
    });
  }
  if (
    quiz.questions[question].type ===
    QUESTION_TYPES.MULTIPLE_ANSWER
  ) {
    answers.forEach((answer) => {
      fireEvent.click(
        getQuestion(question)[answer]
      );
    });
  }
}

function getQuestionAnswer(question) {
  if (
    quiz.questions[question].type ===
    QUESTION_TYPES.MULTIPLE_CHOICE
  ) {
    const q1Text = getByTextLowercase(
      quiz.questions[question].question
    );
    const q1Option1 = getByTitleLowercase(
      `Question ${
        question + 1
      } answers is ${
        quiz.questions[question]
          .options[0].text
      }`
    );
    expect(q1Text).toBeInTheDocument();
    expect(
      q1Option1
    ).toBeInTheDocument();
  }
  if (
    quiz.questions[question].type ===
    QUESTION_TYPES.FREE_FORM
  ) {
    const q3Text = getByTextLowercase(
      quiz.questions[question].question
    );

    const userInput = getByTitleLowercase(
      "You said: This is some good feedback!"
    );
    expect(q3Text).toBeInTheDocument();
    expect(
      userInput
    ).toBeInTheDocument();
  }
  if (
    quiz.questions[question].type ===
    QUESTION_TYPES.MULTIPLE_ANSWER
  ) {
    const q3Text = getByTextLowercase(
      quiz.questions[question].question
    );
    const q3Option1 = getByTitleLowercase(
      `Question ${
        question + 1
      } answers is ${
        quiz.questions[question]
          .options[0].text
      }`
    );
    const q3Option3 = getByTitleLowercase(
      `Question ${
        question + 1
      } answers is ${
        quiz.questions[2].options[0]
          .text
      }`
    );
    expect(q3Text).toBeInTheDocument();
    expect(
      q3Option1
    ).toBeInTheDocument();
    expect(
      q3Option3
    ).toBeInTheDocument();
  }
}

test("user can start a mini test", () => {
  //arrange
  render(<App quiz={quiz} />);

  //act
  startTheQuiz();

  //assert
  const {
    qText,
    a,
    b,
    c,
    d
  } = getQuestion(0);

  expect(qText).toBeInTheDocument();
  expect(a).toBeInTheDocument();
  expect(b).toBeInTheDocument();
  expect(c).toBeInTheDocument();
  expect(d).toBeInTheDocument();
});

test("the user can submit answers to all the questions", () => {
  //arrange
  render(<App quiz={quiz} />);

  //act
  startTheQuiz();
  answerQuestion(0, "a");
  proceedToNextQuestion();
  answerQuestion(1);
  proceedToNextQuestion();
  answerQuestion(2, ["a", "c"]);
  proceedToNextQuestion();
});

test("the user gets results when completed", () => {
  // arrange
  render(<App quiz={quiz} />);

  // act
  startTheQuiz();
  answerQuestion(0, "a");
  proceedToNextQuestion();
  answerQuestion(1);
  proceedToNextQuestion();
  answerQuestion(2, ["a", "c"]);
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
  getQuestionAnswer(0);
  getQuestionAnswer(1);
  getQuestionAnswer(2);
});

test("the user gets accurate results when some are right and some are wrong.", () => {
  // arrange
  render(<App quiz={quiz} />);

  // act
  startTheQuiz();
  answerQuestion(0, "a");
  proceedToNextQuestion();
  answerQuestion(1);
  proceedToNextQuestion();
  answerQuestion(2, ["a", "c"]);
  proceedToNextQuestion();

  // assert
  const restultTitle = getByTextLowercase(
    "Your results are in!"
  );
  expect(
    restultTitle
  ).toBeInTheDocument();
  const percentScore = getByTextLowercase(
    "33%"
  );
  expect(
    percentScore
  ).toBeInTheDocument();
  getQuestionAnswer(0);
  getQuestionAnswer(1);
  getQuestionAnswer(2);
  // Need to deal with dispaying wrong answers
  expect(false).toBeTruthy();
});
