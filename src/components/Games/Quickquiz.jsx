import React, { useState, useEffect } from "react";
import "../../style/games/QuickQuiz.css";
import Cat from '../../assets/home-cat.svg';

const QuickQuiz = ({ setPoints, setPlayerPoints }) => {
  const triviaQuestions = [
    {
      question: "How many legs does a spider have?",
      options: ["6", "8", "10", "12"],
      correct: "8",
    },
    {
      question: "What is the capital of Japan?",
      options: ["Beijing", "Tokyo", "Seoul", "Bangkok"],
      correct: "Tokyo",
    },
    {
      question: "What do rabbits love to eat?",
      options: ["Carrots", "Fish", "Bread", "Berries"],
      correct: "Carrots",
    },
    {
      question: "What color is the sky on a clear day?",
      options: ["Red", "Green", "Blue", "Yellow"],
      correct: "Blue"
    },
    {
      question: "What animal is known for saying 'meow'?",
      options: ["Dog", "Cat", "Cow", "Duck"],
      correct: "Cat"
    },
    {
      question: "Which fruit is yellow and is a monkey's favorite?",
      options: ["Apple", "Banana", "Grapes", "Orange"],
      correct: "Banana"
    },
    {
      question: "What do you call a baby dog?",
      options: ["Puppy", "Kitten", "Calf", "Cub"],
      correct: "Puppy"
    },
    {
      question: "What shape has 4 equal sides?",
      options: ["Circle", "Triangle", "Square", "Rectangle"],
      correct: "Square"
    },
    {
      question: "Which one of these animals can fly?",
      options: ["Lion", "Penguin", "Eagle", "Elephant"],
      correct: "Eagle"
    },
    {
      question: "What color are most grasshoppers?",
      options: ["Red", "Green", "Blue", "Yellow"],
      correct: "Green"
    },
    {
      question: "Which of these is a popular superhero with a red suit?",
      options: ["Iron Man", "Spider-Man", "Superman", "Batman"],
      correct: "Spider-Man"
    },
    {
      question: "What do you call the person who helps you when you're sick?",
      options: ["Teacher", "Doctor", "Baker", "Farmer"],
      correct: "Doctor"
    },
    {
      question: "Which animal has a long neck?",
      options: ["Elephant", "Giraffe", "Kangaroo", "Panda"],
      correct: "Giraffe"
    }
  ];

  // Function to get a random question index
  const getRandomQuestion = () => {
    return Math.floor(Math.random() * triviaQuestions.length);
  };

  const [currentQuestion, setCurrentQuestion] = useState(getRandomQuestion()); // Tracks the current question index
  const [selectedOption, setSelectedOption] = useState(""); // Tracks the selected option
  const [feedback, setFeedback] = useState(""); // Feedback for the answer
  const [score, setScore] = useState(0); // User's score
  const [timer, setTimer] = useState(10); // Timer for each question
  const [lives, setLives] = useState(3); // Game lives
  const [isGameOver, setIsGameOver] = useState(false); // Game over state
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false); // Flag to prevent multiple submissions

  const onPointsEarned = (points) => {
    setScore(score + points); // Adds points to the score
  };

  // Handles the answer submission when an option is clicked
  const handleAnswerSelection = (option) => {
    if (isGameOver || isAnswerSubmitted) return; // Prevent multiple submissions and game over state

    setSelectedOption(option); // Set the selected option
    setIsAnswerSubmitted(true); // Prevent more selection after submission

    const correctAnswer = triviaQuestions[currentQuestion].correct;

    if (option === correctAnswer) {
      setFeedback("Correct! 🎉");
      onPointsEarned(10); // Earn points for correct answer

      // Update points globally
      setPoints((prevPoints) => prevPoints + 10);
      setPlayerPoints(prevPlayerPoints => prevPlayerPoints + 10);
    } else {
      setFeedback(`Incorrect! The correct answer was ${correctAnswer}. ❌`);
      setLives(lives - 1);
      //if lives  is zero stop the game
      if (lives - 1 === 0) {
        setIsGameOver(true);
        setFeedback("Game Over! ❌");
        return;
      }
    }

    setTimeout(() => {
      if (!isGameOver) {
        setFeedback("");
        setSelectedOption(""); // Reset selected option
        setCurrentQuestion(getRandomQuestion()); // Set new question
        setTimer(10); // Reset timer for next question
      }
      setIsAnswerSubmitted(false); // Allow for answer submission again
    }, 1000); // Short delay before resetting for the next question
  };

  // Effect to manage the countdown timer
  useEffect(() => {
    if (isGameOver) return; // Stop timer if game over

    if (timer === 0) {
      // If timer hits 0, move to the next question
      handleAnswerSelection(""); // Handle timeout like an answer selection
      return; // Prevents the timer from continuing to count down
    }

    // Set interval to decrease the timer every second
    const timerId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    // Clean up interval on component unmount or when timer is 0
    return () => clearInterval(timerId);
  }, [timer, isGameOver]); // Dependency array ensures the effect runs when the timer changes

  return (
    <div>
      <div className="game-frame">
        <h1 className="game-title">Let's Play!</h1>

        <div className="quiz-container">
          <h2 className="quiz-title">Quick Quiz Challenge</h2>
          <div className="game-status">
            <div className="quiz-score">
              Score: {score}
            </div>
            <div className="quiz-game-timer">
              Time: {timer}s {/* Display remaining time */}
            </div>
            <div className="quiz-game-lives">
              Lives: {lives} / 3 {/* Display remaining life */}
            </div>
          </div>
          <div className="quiz-question-container">
            <p className="quiz-question">
              {triviaQuestions[currentQuestion].question} {/* Display the current question */}
            </p>
            <div className="quiz-options">
              {/* Map over the options and display buttons */}
              {triviaQuestions[currentQuestion].options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswerSelection(option)} // Set the selected option and submit
                  className={`quiz-option-button ${selectedOption === option ? 'selected' : ''}`} // Highlight selected option
                  disabled={isAnswerSubmitted} // Disable options after answer submission
                >
                  {option} {/* Option text */}
                </button>
              ))}
            </div>
          </div>
          <p className={`quiz-feedback ${feedback.includes('Correct') ? 'correct' : 'incorrect'}`}>
            {feedback} {/* Display feedback */}
          </p>
        </div>
        <img src={Cat} alt="cute pixel cat" className="game-cat" /> {/* Display cat image */}
      </div>
    </div>
  );
};

export default QuickQuiz;
