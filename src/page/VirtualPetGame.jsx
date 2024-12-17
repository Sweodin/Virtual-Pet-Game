import React, { useState } from "react";
import MathGame from "../components/Games/MathGame";
import QuickQuiz from "../components/Games/Quickquiz";
import '../style/Games/VirtualPetGame.css';
import Cat from '../assets/home-cat.svg';

const VirtualPetGame = ({points, setPoints }) => {
  const [playerPoints, setPlayerPoints] = useState(0);
  const [selectedGame, setSelectedGame] = useState(null);

  const handlePointsEarned = (earnedPoints) => {
    setPlayerPoints((prevPoints) => prevPoints + earnedPoints);
  };

  
  const renderSelectedGame = () => {
    switch (selectedGame) {
      case "math":
        return <MathGame points={points} setPoints={setPoints} onPointsEarned={handlePointsEarned} />;
      case "quiz":
        return <QuickQuiz points={points} setPoints={setPoints} playerPoints={playerPoints} setPlayerPoints={setPlayerPoints} onPointsEarned={handlePointsEarned} />;
      default:
        return null;
    }
  };

  return (
    <div>
      {selectedGame ? (
    <div>
    <button onClick={() => setSelectedGame(null)} className="back-button">Back to Games</button>
    {renderSelectedGame()}
  </div>
) : (
    <div className="game-frame">
    <div className="virtual-pet-game">
      <h1 className="game-title">Game Center</h1>
      <p>Total Points: {playerPoints}</p>
      <div className="game-buttons">
      <button onClick={() => setSelectedGame('math')}>Math Game</button>
      <button onClick={() => setSelectedGame('quiz')}>Quick Quiz</button>
      </div>
      </div>
      <img src={Cat} alt="cute pixel cat" className="game-cat" />
      </div>
  )};
  </div>
  );
};
export default VirtualPetGame;
