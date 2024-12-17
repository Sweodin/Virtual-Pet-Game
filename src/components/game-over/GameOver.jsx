import { Navigate, useNavigate } from 'react-router-dom';
import '../../style/game-over/game-over.css';

const GameOver = ({ onRestart }) => {
    const navigate = useNavigate();

    const handleRestart = () => {
        onRestart();
        navigate('/play'); 
    }

    return (
        <div className="game-over-overlay">
            <div className="game-over-content">
                <h1>Game Over</h1>
                <button className="restart" onClick={handleRestart}>Restart Game</button>
            </div>
        </div>
    );
};

export default GameOver