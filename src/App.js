import {
  useEffect,
  useState
} from "react";

function App({ quiz }) {
  const [step, setStep] = useState(0);
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
      default: {
        return (
          <>
            <h2>
              {
                quiz.questions[step - 1]
                  .question
              }
            </h2>
            {quiz.questions[
              step - 1
            ].options.map(
              ({ text }, i) => (
                <button
                  title={`Choose option ${
                    i + 1
                  }: ${text}`}
                  onClick={() => {
                    setStep(step + 1);
                  }}
                >
                  {text}
                </button>
              )
            )}
          </>
        );
      }
    }
  }
  return (
    <div>{getView(step, quiz)}</div>
  );
}

export default App;
