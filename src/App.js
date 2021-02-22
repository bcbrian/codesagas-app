import {
  // useEffect,
  useState
} from "react";

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
            <div>100%</div>
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
