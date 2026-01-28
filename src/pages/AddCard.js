import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardForm from "../components/CardForm";
import { addCard } from "../services/api";

export default function AddCard() {
  const navigate = useNavigate();

  // 1. Initialize local state for the form
  const [formData, setFormData] = useState({
    card_name: "",
    card_pic: "",
  });

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // 2. Handle input changes (updates state as user types)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 3. Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    try {
      setBusy(true);
      setError("");

      // Call the API service
      await addCard(formData);

      // Redirect to the list view on success
      navigate("/cards");
    } catch (err) {
      // Capture error from handleRes in api.js
      setError(err.message || "Failed to add card. Please try again.");
    } finally {
      setBusy(false);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  return (
    <main className="form-page">
      <div className="form-card">
        <h1>Add New Card</h1>
        <p className="form-subtitle">Fill in the details to create a new entry in the database.</p>

        <CardForm
          values={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          busy={busy}
          error={error}
          submitText="Create Card"
        />

        <button
          className="btn-link"
          onClick={() => navigate("/cards")}
          disabled={busy}

        >
          Cancel and Go Back
        </button>
      </div>
    </main >
  );
}