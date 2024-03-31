import { useState } from 'react';
import { registerWithEmailAndPassword } from './firebase';

export default function AdminDashboard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State to hold any error message

  const handleRegisterStudent = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      await registerWithEmailAndPassword(email, password);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      alert('Student registered successfully');
    } catch (error) {
      setErrorMessage(`Failed to register student: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard - Register Student</h1>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <form onSubmit={handleRegisterStudent}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register Student</button>
      </form>
    </div>
  );
}
