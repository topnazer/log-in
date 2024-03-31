import { useState } from 'react';
import './Auth.css';
import ReCAPTCHA from "react-google-recaptcha";

import {
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
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
    const [captchaValue, setCaptchaValue] = useState(null);

    const onCaptchaChange = value => {
        console.log("Captcha value:", value);
        setCaptchaValue(value);
    };

    const handleLogin = (e) => {
      e.preventDefault();

      if (!captchaValue) {
        alert("Please solve the CAPTCHA to confirm you are not a robot.");
        return;
      }

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
      {/* CAPTCHA integration starts here */}
      <ReCAPTCHA
        sitekey="6Lf1LKopAAAAAE97wir-4apXaFsQ0myHefdMHPcg" // Replace with your reCAPTCHA site key
        onChange={onCaptchaChange}
      />
      {/* CAPTCHA integration ends here */}
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

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== rPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      const user = await registerWithEmailAndPassword(email, password);
      if(user) {
        alert("Registration successful. Please log in.");
        setEmail('');
        setPassword('');
        setRPassword('');
        setLogin(true); // Ensure this is after registration success
      }
    } catch (error) {
      alert(`Failed to register: ${error.message}`);
    }
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
