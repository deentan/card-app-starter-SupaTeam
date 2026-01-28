import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getCards, deleteCard } from "../services/api";

export default function CardList() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState("");

  // Check role
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  useEffect(() => {
    const load = async () => {
      try {
        setError("");
        setLoading(true);
        const data = await getCards();
        setCards(data);
      } catch (err) {
        setError(err?.message || "Failed to load cards");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleDelete = async (id) => {
    // Check for auth token first
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to delete a card!");
      return;
    }

    const ok = window.confirm("Delete this card?");
    if (!ok) return;

    try {
      setError("");
      setBusyId(id);
      await deleteCard(id);
      setCards((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      setError(err?.message || "Failed to delete card");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <main className="page">
      <h1 className="page-title">All Cards</h1>

      {loading && <p>Loading cards...</p>}

      {!loading && error && (
        <div className="error-banner">
          {error}
        </div>
      )}

      {!loading && !error && cards.length === 0 && (
        <p>No cards found.</p>
      )}

      {!loading && cards.length > 0 && (
        <section className="card-grid">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              onDelete={handleDelete}
              busy={busyId === card.id}
              isAdmin={isAdmin}
            />
          ))}
        </section>
      )}
    </main>
  );
}
