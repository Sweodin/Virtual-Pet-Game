import React, { useState, useEffect } from "react";
import "../../style/games/MathGame.css";
import Cat from '../../assets/home-cat.svg';

const MathGame = ({ onPointsEarned, points, setPoints }) => {
    const [question, setQuestion] = useState({});
    const [answer, setAnswer] = useState("");
    const [feedback, setFeedback] = useState("");
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [questionCount, setQuestionCount] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const [gameOver, setGameOver] = useState(false);
    const [previousQuestion, setPreviousQuestion] = useState(null);

    const generateQuestion = () => {
      let num1, num2;
      do {
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
      } while (num1 + num2 === previousQuestion);
    
    const newQuestion = { num1, num2, correctAnswer: num1 + num2 };
    setPreviousQuestion(newQuestion);
    setQuestion(newQuestion);
    setAnswer("");
  };

  const checkAnswer = () => {
    if (parseInt(answer, 10) === question.correctAnswer) {
      const earnedPoints = 10; // Points earned

      setFeedback("Correct! 🎉");
      setScore((prevScore) => prevScore + earnedPoints);
  
      // Update points after correct answer
      setPoints((prevPoints) => {
        const updatedPoints = prevPoints + earnedPoints;

        // Pass the updated points to the parent component
        if (onPointsEarned) {
          onPointsEarned(updatedPoints);  // Pass the updated points value
        }

        return updatedPoints; // Return updated points to be saved in state
        
      });
  
      setQuestionCount((prevCount) => prevCount + 1);
    } else {
      setFeedback("Incorrect, try again! ❌");
      setLives((prev) => prev - 1);
    }
    setTimeLeft(10);
    setTimeout(() => {
      setFeedback("");
      generateQuestion();
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !gameOver && answer) {
      checkAnswer();
    }
  };

  const resetGame = () => {
    setLives(3);
    setScore(0);
    setQuestionCount(0);
    setGameOver(false);
    setTimeLeft(10);
    setFeedback("");
    setPreviousQuestion(null);
    generateQuestion();
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  useEffect(() => {
    if (lives === 0 || questionCount === 10){
      setGameOver(true);
    }
    }, [lives, questionCount]);

    useEffect(() => {
      if (!gameOver && timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearTimeout(timer);
      }else if (timeLeft === 0 && !gameOver) {
        setLives((prev) => prev - 1);
        setTimeLeft(10);
        generateQuestion();
      }
    }, [timeLeft, gameOver]);

  return (
    <div>
      <div className="game-frame">
      <h1 className="game-title">Let's play!</h1>
      <div className="math-game-container">
        <h2 className="math-game-title">Math Game</h2>
        <div className="math-game-stats">
        <div className="math-game-score">
          Score: {score}
        </div>
        <div className="math-game-lives">Lives: {lives}</div>
        <div className="math-game-timer">Time: {timeLeft}s</div>
        <div className="math-game-questions">Question: {questionCount}/10</div>
            </div>
            {!gameOver ? (
        <div className="math-game-question-container">
          <p className="math-game-question">
            {question.num1} + {question.num2} = ?
          </p>
          <input
            type="text"
            inputMode="numeric"
            value={answer}
            onChange={(e) => setAnswer(e.target.value.replace(/[^0-9]/g, ''))}
            onKeyDown={handleKeyPress}
            placeholder=""
            className="math-game-input"
            autoFocus
          />
          <button 
            onClick={checkAnswer}
            className="math-game-button"
            disabled={!answer}
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="math-game-over">
          <h2>Game Over!</h2>
          <p>Final Score: {score}</p>
          <p>You answered {questionCount} out of 10 questions correctly</p>
          <button onClick={resetGame} className="math-game-button">Play Again</button>
        </div>
      )}
        <p className={`math-game-feedback ${feedback.includes('Correct') ? 'correct' : 'incorrect'}`}>
          {feedback}
        </p>
      </div>
      <img src={Cat} alt="cute pixel cat" className="game-cat" />
    </div>
    </div>
  );
};

export default MathGame;