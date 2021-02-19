import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

const QUIZ = {
  title: "Quiz Title",
  subtitle: "The longer subtitle for the quiz.",
  startButtonText: "start quiz",
}

function regexI(str){
  return RegExp(str, "i");
}

test('user can start a mini test', () => {
  //arrange
  render(<App quiz={QUIZ} />);
  
  //act
  
  //assert
  const titleElement = screen.getByText(regexI(QUIZ.title));
  const subtitleElement = screen.getByText(regexI(QUIZ.subtitle));
  const startButtonElement = screen.getByText(regexI(QUIZ.startButtonText));
  expect(titleElement).toBeInTheDocument();
  expect(subtitleElement).toBeInTheDocument();
  expect(startButtonElement).toBeInTheDocument();
  
  //act
  fireEvent.click(startButtonElement)
  
  //assert
  const q1Text =   const titleElement = screen.getByText(regexI(QUIZ[0].title));

});
