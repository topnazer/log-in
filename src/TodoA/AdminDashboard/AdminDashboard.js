import { useState } from 'react';
import { registerWithEmailAndPassword } from '../../firebase';
import './AdminDashboard.css'; // Make sure this path matches where your CSS file is located

export default function AdminDashboard() {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegisterStudent = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    try {
      await registerWithEmailAndPassword(email, password, firstName, lastName);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setFirstName('');
      setLastName('');
      setShowForm(false); // Hide the form upon successful registration
      alert('Student registered successfully');
    } catch (error) {
      setErrorMessage(`Failed to register student: ${error.message}`);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <button onClick={() => setShowForm(!showForm)} className="toggle-form-button">Add Student</button>
      {showForm && (
        <div className="form-container">
          <h2>Register Student</h2>
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
          <form onSubmit={handleRegisterStudent}>
            <div>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
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
      )}
    </div>
  );
}
