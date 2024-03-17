import { useState } from 'react';
import './Auth.css';

import {
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail, // Ensure this is implemented in your Firebase service file
} from '../../firebase';

import Theme from '../../TodoA/Theme/Theme';

export default function Auth() {
  const [login, setLogin] = useState(true);
  return (
    <div className="auth">
      <Intro />
      {login ? <Login setLogin={setLogin} /> : <Register setLogin={setLogin} />}
    </div>
  );
}

function Intro() {
  return (
    <div className="intro">
      <Theme />
      <h1>Log in</h1>
    </div>
  );
}

function Login({ setLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [resetEmail, setResetEmail] = useState('');
    const [showResetModal, setShowResetModal] = useState(false);
  
    const handleLogin = (e) => {
      e.preventDefault();
      loginWithEmailAndPassword(email, password);
    };
  
    const handleResetPassword = async () => {
        if (resetEmail) {
          try {
            await sendPasswordResetEmail(resetEmail);
            alert('Password reset email sent. Check your inbox.'); // Success message
            setShowResetModal(false);
            setResetEmail('');
          } catch (error) {
            // Error handling with a more informative message
            alert(`Error sending password reset email. ${error.message}`);
          }
        } else {
          // This alert is for when the email field is left empty
          alert('Please enter your email address.');
        }
      };

  return (
    <div className="form">
    <h1>Login</h1>
    <form onSubmit={handleLogin}>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button type="submit">Login</button>
      <p>
        No account?
        <span onClick={() => setLogin(false)}>Register</span>
      </p>
        <p>
          Forgot password?
          <span onClick={() => setShowResetModal(true)} className="reset-link"> Reset Password</span>
        </p>
      </form>
      {showResetModal && (
        <div className="reset-modal">
          <div className="reset-modal-content">
            <span className="close" onClick={() => setShowResetModal(false)}>&times;</span>
            <h2>Reset Password</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
            <button onClick={handleResetPassword}>Send Reset Email</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Register({ setLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rPassword, setRPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    registerWithEmailAndPassword(email, password);
  };
  return (
    <div className="form">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <label htmlFor="rpassword">Confirm Password:</label>
        <input
          type="password" // Corrected the type from "rpassword" to "password"
          name="rpassword"
          id="rpassword"
          placeholder="Confirm Password"
          onChange={(e) => setRPassword(e.target.value)}
          value={rPassword}
        />
        <button type="submit">Register</button>
        <p>
          Have account?
          <span onClick={() => setLogin(true)}>Login</span>
        </p>
      </form>
    </div>
  );
}
