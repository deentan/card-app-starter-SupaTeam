import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardForm from "../components/CardForm";
import { getCards, updateCard } from "../services/api";

export default function EditCard() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State Management
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Fetch the card data on mount
  useEffect(() => {
    async function loadCard() {
      try {
        setLoading(true);
        const cards = await getCards();
        // Since getCards fetches all, we find the specific one by ID
        const cardToEdit = cards.find((c) => c._id === id || c.id === id);

        if (!cardToEdit) {
          throw new Error("Card not found");
        }

        setInitialData(cardToEdit);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadCard();
  }, [id]);

  // 2. Handle Form Submission
  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await updateCard(id, formData);
      navigate("/"); // Redirect to home or list page after success
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // UI States
  if (loading) return <div className="status">Loading card data...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <main className="form-container">
      <h1>Edit Card</h1>

      {/* 3. Pass data and submission handler to CardForm */}
      <CardForm
        onSubmit={handleSubmit}
        initialData={initialData}
        isBusy={isSubmitting}
      />

      {isSubmitting && <p>Saving changes...</p>}

      <button onClick={() => navigate(-1)} className="btn-cancel">
        Back
      </button>
    </main>
  );
}