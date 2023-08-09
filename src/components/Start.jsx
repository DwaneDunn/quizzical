// import React from 'react';
import './Start.css';

function Start(props) {
  // TODO
  // Destructure props Start{handleStart}
  // Can then set onClick={handleStart}
  // console.log('start: ', props);
  return (
    <div className="game--start">
      <h1 className="game--title">Quizzical</h1>
      <p className="game--desc">Start a new fun Quiz Game</p>
      <button className="game--start-btn" onClick={props.handleStart}>
        Start Quiz
      </button>
    </div>
  );
}

export default Start;
