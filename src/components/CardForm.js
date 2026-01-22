export default function CardForm({
  values = {},
  onChange,
  onSubmit,
  busy,
  error,
  submitText,
}) {


  return (
    <form className="card-form" onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="card_name" className="form-label">Card Name</label>
        <input
          type="text"
          id="card_name"
          name="card_name"
          className="form-input"
          value={values.card_name || ""}
          onChange={onChange}
          required
          placeholder="Enter card name"
          disabled={busy}
        />
      </div>

      <div className="form-group">
        <label htmlFor="card_pic" className="form-label">Image URL</label>
        <input
          type="url"
          id="card_pic"
          name="card_pic"
          className="form-input"
          value={values.card_pic || ""}
          onChange={onChange}
          required
          placeholder="https://example.com/image.jpg"
          disabled={busy}
        />
      </div>

      {error && <div className="form-error">{error}</div>}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={busy}>
          {busy ? "Processing..." : submitText}
        </button>
      </div>
    </form>
  );
}
