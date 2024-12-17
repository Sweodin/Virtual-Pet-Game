import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Bird from '../../assets/form/flapping.png';
import Chest from '../../assets/form/chest.png';
import '../../style/register/register.css'

const Register = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const saveUserData = (userData) => {
    const expirationTime = new Date().getTime() + 3600000;
    const dataToSave = {
      ...userData,
      expirationTime,
    };
    localStorage.setItem('user', JSON.stringify(dataToSave));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const userData = { username, email, password };
    saveUserData(userData);

    setIsAuthenticated(true);
    navigate('/play');
  };

  return (
    <div className="form-wrapper">
       <section className="heading">
        <h1 className="heading-text">
          Virtual Pet
        </h1>
      </section>
      <section className="bird-chest">
        <img className="bird"src={Bird} alt="Bird flapping" />
        <img className="chest"src={Chest} alt="Chest" />
      </section>
      <form onSubmit={handleRegister} className="register-form">
        <section className="input-container">
          <section className="form-content">
            <h2 className="text">Register</h2>
          </section>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@example.com"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="*******"
            required
          />
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            name="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="*******"
            required
          />
          <section className="checkbox-container">
            <input type="checkbox" id="agreement" className="checkbox" />
            <label htmlFor="agreement" className="checkbox-text">
              I agree to the Terms of Service and Privacy Policy
            </label>
          </section>
        </section>
        <section className="sign-up-container">
          <button className="sign-up" type="submit">Sign Up</button>
        </section>
        <section className="question-terms-container">
          <p className="question">
            Do you have an account? 
            <Link to="/login"> Sign in</Link>
          </p>
        </section>
      </form>
    </div>
  );
};

export default Register;
