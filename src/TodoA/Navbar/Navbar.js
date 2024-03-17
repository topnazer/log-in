import './Navbar.css';

import { Theme } from '../';
import { FaArrowsTurnToDots } from "react-icons/fa6";

export default function Navbar({ user, logout }) {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <FaArrowsTurnToDots  size={30} />
        <h1>DashBoards</h1>
      </div>
      <div className="nav-links">
      <p>{user.email}</p>
        <button onClick={logout}>Sign Out</button>
        <Theme />
      </div>
    </nav>
  );
}