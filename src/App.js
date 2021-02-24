import {
  // useEffect,
  useState
} from "react";

const QUESTION_TYPES = {
  MULTIPLE_CHOICE: "multiple choice",
  FREE_FORM: "free form",
  MULTIPLE_ANSWER: "multiple answer"
};

function App({ quiz }) {
  const [step, setStep] = useState(0);
  const [
    userAnswers,
    setUserAnswers
  ] = useState({});
  // useEffect(() => {
  //   if(step > quiz.questions.length){

  //   }
  // })

  function getCalculatedPercent() {
    const total = Object.keys(
      userAnswers
    ).reduce((totalRight, answer) => {
      // if right
      if (
        quiz.questions[answer].type ===
        QUESTION_TYPES.MULTIPLE_CHOICE
      ) {
        const rightAnswer = quiz.questions[
          answer
        ].options.find(
          ({ isCorrect }) => isCorrect
        );
        if (
          (userAnswers[
            answer
          ] = rightAnswer)
        ) {
          return totalRight + 1;
        }
      }
      if (
        quiz.questions[answer].type ===
        QUESTION_TYPES.MULTIPLE_ANSWER
      ) {
        const rightAnswers = quiz.questions[
          answer
        ].options.filter(
          ({ isCorrect }) => isCorrect
        );
        if (
          rightAnswers.every((a) =>
            userAnswers[
              answer
            ].includes(a)
          ) &&
          userAnswers[
            answer
          ].every((a) =>
            rightAnswers.includes(a)
          )
        ) {
          return totalRight + 1;
        }
      }
      if (
        quiz.questions[answer].type ===
        QUESTION_TYPES.FREE_FORM
      ) {
        return totalRight + 1;
      }
      // else
      return totalRight;
    }, 0);
    return Math.round(
      (total / quiz.questions.length) *
        100
    );
  }

  function getView(step, quiz) {
    switch (step) {
      case 0: {
        return (
          <>
            <h1>{quiz.title}</h1>
            <h3>{quiz.subtitle}</h3>
            <button
              onClick={() => {
                setStep(step + 1);
              }}
            >
              {quiz.startButtonText}
            </button>
          </>
        );
      }
      case quiz.questions.length + 1: {
        return (
          <>
            <div>
              Your results are in!
            </div>
            <div>
              {getCalculatedPercent()}%
            </div>
            {quiz.questions.map(
              (question, count) => (
                <>
                  <div>
                    {question.question}
                  </div>
                  {question?.options
                    ?.filter(
                      ({ isCorrect }) =>
                        isCorrect
                    )
                    .map(({ text }) => (
                      <div
                        title={`Question ${
                          count + 1
                        } answers is ${text}`}
                      >
                        {text}
                      </div>
                    ))}
                  {!question?.options && (
                    <div
                      title={`You said: ${userAnswers[count]}`}
                    >
                      {
                        userAnswers[
                          count
                        ]
                      }
                    </div>
                  )}
                </>
              )
            )}
          </>
        );
      }
      default: {
        switch (
          quiz.questions[step - 1].type
        ) {
          case "multiple choice":
            return (
              <>
                <h2>
                  {
                    quiz.questions[
                      step - 1
                    ].question
                  }
                </h2>
                {quiz.questions[
                  step - 1
                ].options.map(
                  ({ text }, i) => (
                    <button
                      key={`${text}-${i}`}
                      title={`Choose option ${
                        i + 1
                      }: ${text}`}
                      onClick={() => {
                        // setStep(step + 1);
                      }}
                    >
                      {text}
                    </button>
                  )
                )}
                <button
                  onClick={() => {
                    setStep(step + 1);
                  }}
                >
                  next
                </button>
              </>
            );
          case "multiple answer":
            return (
              <>
                <h2>
                  {
                    quiz.questions[
                      step - 1
                    ].question
                  }
                </h2>
                {quiz.questions[
                  step - 1
                ].options.map(
                  ({ text }, i) => (
                    <button
                      key={`${text}-${i}`}
                      title={`Choose option ${
                        i + 1
                      }: ${text}`}
                      onClick={() => {
                        // setStep(step + 1);
                      }}
                    >
                      {text}
                    </button>
                  )
                )}
                <button
                  onClick={() => {
                    setStep(step + 1);
                  }}
                >
                  next
                </button>
              </>
            );

          case "free form":
            return (
              <>
                <h2>
                  {
                    quiz.questions[
                      step - 1
                    ].question
                  }
                </h2>
                <label htmlFor="question-input">
                  {
                    quiz.questions[
                      step - 1
                    ].label
                  }
                </label>
                <input
                  id="question-input"
                  value={
                    userAnswers[
                      step - 1
                    ] || ""
                  }
                  onChange={({
                    target
                  }) =>
                    setUserAnswers({
                      ...userAnswers,
                      [step -
                      1]: target.value
                    })
                  }
                />
                <button
                  onClick={() => {
                    setStep(step + 1);
                  }}
                >
                  next
                </button>
              </>
            );

          default:
            throw new Error(
              "unsupported question type"
            );
        }
      }
    }
  }
  return (
    <div>{getView(step, quiz)}</div>
  );
}

export default App;
