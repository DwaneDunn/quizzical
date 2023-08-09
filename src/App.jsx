import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { decode } from 'html-entities';
import Start from './components/Start';
import Quiz from './components/Quiz';
// import quizData from './data';

// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';

import './App.css';

function App() {
  // Quiz State
  const [quiz, setQuiz] = useState({
    hasStarted: false,
    round: 0,
    score: 0,
    answered: 0,
    conrrect: 0,
  });

  // Questions State
  const [questions, setQuestions] = useState(null);

  /* SHUFFLE ARRAY */
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  // 1. GET THE QUESTIONS
  // Process Questions & Answers
  useEffect(() => {
    const getQuestions = async () => {
      const options = { level: 'html5' }; // decode options

      // Data From OPENTDB API
      const res = await fetch(
        'https://opentdb.com/api.php?amount=5&type=multiple'
      );

      // Response
      const data = await res.json();

      // Map Questions
      const results = data.results.map((result) => {
        return {
          id: nanoid(),
          question: decode(result.question, options),
          correctAnswer: decode(result.correct_answer),
          // Shuffel Answer Array
          answers: shuffle(
            [...result.incorrect_answers, result.correct_answer].map(
              (answer) => {
                return {
                  id: nanoid(),
                  answer: decode(answer, options),
                  selected: false,
                  correct: answer === result.correct_answer ? true : false,
                };
              }
            )
          ),
        };
      });

      setQuestions(results); // Put questions in state
    };

    getQuestions(); // Call Function
  }, []); // Run Once - Array

  // 2. START NEW QUIZ
  const handleStart = () => {
    startQuiz();
  };

  // Update Quiz State
  const startQuiz = () => {
    setQuiz((prev) => ({
      ...prev,
      hasStarted: true,
      round: prev.round + 1,
    }));
  };

  // Reset to create new quiz
  const resetQuiz = () => {
    // getQuestions();
    setQuiz({
      hasStarted: false,
      round: 0,
      score: 0,
      answered: 0,
      conrrect: 0,
    });
    console.log('Quiz Reset');
  };

  return (
    <main>
      {quiz.hasStarted ? (
        <Quiz quiz={quiz} questions={questions} resetQuiz={resetQuiz} />
      ) : (
        <Start handleStart={handleStart} />
      )}
    </main>
  );
}

export default App;
