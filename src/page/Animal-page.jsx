import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GameOver from '../components/game-over/GameOver';
import Star from '../assets/star.svg';
import Cat from '../assets/home-cat.svg';
import '../style/animal-page/animal-page.css';

const AnimalPage = ({points}) => {
  const [hunger, setHunger] = useState(50);
  const [thirst, setThirst] = useState(90);
  const [isGameOver, setIsGameOver] = useState(false);

  const navigate = useNavigate();

  // Hydrate animal
  const hydrateAnimal = () => {
    if (thirst < 100) {
      setThirst(thirst + 10);
    } else {
      alert("Not thirsty");
    }

    // If thirst reaches 0, end the game
    if (thirst <= 0) {
      setIsGameOver(true);
    }
  };

  //points update in Animal Page
  useEffect(() => {
    console.log("Points updated in AnimalPage:", points);
  }, [points]);
  

  // Hunger effect every 10 seconds
  useEffect(() => {
    if (hunger < 10) {
      setIsGameOver(true);
    } else {
      const hungerInterval = setInterval(() => {
        setHunger((prevHunger) => prevHunger - 10);
      }, 7500);
      return () => clearInterval(hungerInterval);
    }
  }, [hunger]);

  // Thirst effect every 10 seconds
  useEffect(() => {
    if (thirst < 0) {
      setIsGameOver(true);
    } else {
      const thirstInterval = setInterval(() => {
        setThirst((prevThirst) => prevThirst - 10);
      }, 10000);
      return () => clearInterval(thirstInterval);
    }
  }, [thirst]);

  // Play game
  const handlePlay = () => {
    navigate('/play/game');
  };

  // Feed page navigation
  const handleFood = () => {
    navigate('/play/food');
  };

  // Feed page navigation
  const handleHydrate = () => {
    navigate('/play/drink');
  };

  const restartGame = () => {
    setHunger(75);
    setThirst(75);
    setIsGameOver(false);
  };

  return (
    <section className="animal-page-container">
      {isGameOver && <GameOver onRestart={restartGame} />}

      <section className="point-container">
        <p className="star-point-number" id="star">{points}</p>
        <img src={Star} alt="star points" />
      </section>

      <section className="animal-status-container">
        <section className="animal-img">
          <img src={Cat} alt="cute cat" />
        </section>

        <section className="animal-status">
          <section className="needs">
            <div className="text-container">
              <p className="spec">Hunger</p>
            </div>
            <div className="bar">
              <div className="color" style={{ width: `${hunger}%`, backgroundColor: '#5EE270' }}></div>
            </div>
          </section>

          <section className="needs">
            <div className="text-container">
              <p className="spec">Thirst</p>
            </div>
            <div className="bar">
              <div className="color" style={{ width: `${thirst}%`, backgroundColor: '#5EE270' }}></div>
            </div>
          </section>

          <section className="needs">
            <div className="text-container">
              <p className="spec">Fun</p>
            </div>
            <div className="bar">
              <div className="color" style={{ width: ``, backgroundColor: '#FB5D5D' }}></div>
            </div>
          </section>
        </section>
      </section>

      <section className="animal-page-btn">
        <button className="btn-game" onClick={handleFood}>Feed</button>
        <button className="btn-game" onClick={handlePlay}>Play</button>
        <button className="btn-game">Store</button>
        <button className="btn-game" onClick={handleHydrate}>Hydrate</button>
      </section>
    </section>
  );
};

export default AnimalPage;
