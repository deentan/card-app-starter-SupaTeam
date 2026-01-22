import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardForm from "../components/CardForm";
import { getCards, updateCard } from "../services/api";

export default function EditCard() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State for the form fields
  const [formData, setFormData] = useState({ card_name: "", card_pic: "" });
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCard() {
      try {
        const cards = await getCards();
        const targetId = Number(id); // Convert for MySQL
        const cardToEdit = cards.find((c) => c.id === targetId);

        if (!cardToEdit) throw new Error("Card not found");

        // Pre-fill the form with data from MySQL
        setFormData({
          card_name: cardToEdit.card_name,
          card_pic: cardToEdit.card_pic
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadCard();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      setBusy(true);
      await updateCard(id, formData);
      navigate("/cards");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <main>
      <h1>Edit Card</h1>
      <CardForm
        values={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        busy={busy}
        error={error}
        submitText="Save Changes"
      />
    </main>
  );
}