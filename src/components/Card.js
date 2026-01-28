import { Link } from "react-router-dom";

export default function Card({ card, onDelete, busy, isAdmin }) {
  return (
    <div className="card">
      <div className="card-image-container">
        <img
          src={card.card_pic || "https://placehold.co/600x400?text=No+Image"}
          alt={card.card_name || "Card image"}
          className="card-image"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
        />
      </div>

      <div className="card-content">
        <h3 className="card-title">{card.card_name}</h3>
        <p className="card-id">ID: {card.id}</p>

        <div className="card-actions">
          {/* Guide says Edit route is /cards/:id/edit */}
          <Link to={`/editcard/${card.id}`} className="btn btn-secondary">
            Edit
          </Link>

          <button
            type="button"
            onClick={() => onDelete(card.id)}
            disabled={busy}
            className="btn btn-danger"
          >
            {busy ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
