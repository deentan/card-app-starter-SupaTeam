import { NavLink } from "react-router-dom";

export default function Navbar() {


  return (
    <header className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-brand">
          Card App
        </NavLink>
        <nav className="navbar-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Home
          </NavLink>
          <NavLink
            to="/cards"
            end
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            All Cards
          </NavLink>
          <NavLink
            to="/cards/new"
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Add Card
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
