import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

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

          {token ? (
            <button onClick={handleLogout} className="btn-link nav-link">
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
