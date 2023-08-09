import { useState } from 'react';
import './Quiz.css';

function Quiz({ quiz, questions, resetQuiz }) {
  const [selectedAnswers, setSelectedAnswers] = useState(
    new Array(questions.length).fill(null)
  );

  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerClick = (index, answer) => {
    setSelectedAnswers((prevSelectedAnswers) =>
      prevSelectedAnswers.map((prevAnswer, i) =>
        i === index ? answer : prevAnswer
      )
    );
  };

  const handleReset = () => {
    setScore(0);
    setSubmitted(false);
    setSelectedAnswers(new Array(questions.length).fill(null));
    resetQuiz();
  };

  const handleSubmit = () => {
    let newScore = 0;
    for (let i = 0; i < questions.length; i++) {
      if (selectedAnswers[i] === questions[i].correctAnswer) {
        newScore++;
      }
    }
    setScore(newScore);
    setSubmitted(true);
  };

  return (
    <div className="questions--container">
      {questions.map((question, index) => (
        <div className="question-container" key={question.id}>
          <h2 className="question--text">{question.question}</h2>
          <ul className="answers-container">
            {question.answers.map((answer) => (
              <li key={answer.id}>
                <button
                  className="answer-btn"
                  onClick={() => {
                    handleAnswerClick(index, answer.answer);
                  }}
                  style={{
                    backgroundColor:
                      selectedAnswers[index] === answer.answer
                        ? '#D6DBF5'
                        : submitted && answer.answer === question.correctAnswer
                        ? '#94D7A2'
                        : submitted &&
                          answer.answer === question.correctAnswer &&
                          selectedAnswers[index] === question.correctAnswer
                        ? '#F8BCBC'
                        : 'transparent',
                  }}
                >
                  {answer.answer}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {!submitted && (
        <button className="btn-check-ans" onClick={handleSubmit}>
          Check Answers
        </button>
      )}
      {submitted && (
        <div className="game-score">
          <p className="game-score-text">
            Your scored {score}/{questions.length} correct answers
          </p>
          <button className="btn-reset" onClick={handleReset}>
            Play again
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
