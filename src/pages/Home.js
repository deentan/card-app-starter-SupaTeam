import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="home-container">
      <section className="hero">
        <h1 className="hero-title">Welcome to Card Manager</h1>
        <p className="hero-subtitle">
          Your simple, powerful solution for organizing and managing digital cards
          connected to your MySQL database.
        </p>

        <div className="home-actions">
          <Link to="/cards" className="btn btn-primary">
            View My Cards
          </Link>
          <Link to="/cards/new" className="btn btn-secondary">
            Add New Card
          </Link>
        </div>
      </section>

      <section className="instructions">
        <h2>How it works</h2>
        <div className="instruction-grid">
          <div className="step">
            <span className="step-num">1</span>
            <h3>Explore</h3>
            <p>View your collection of cards fetched in real-time from Aiven MySQL.</p>
          </div>
          <div className="step">
            <span className="step-num">2</span>
            <h3>Modify</h3>
            <p>Easily edit card details or delete entries you no longer need.</p>
          </div>
          <div className="step">
            <span className="step-num">3</span>
            <h3>Sync</h3>
            <p>Changes are automatically updated across your web service and database.</p>
          </div>
        </div>
      </section>
    </main>
  );
}