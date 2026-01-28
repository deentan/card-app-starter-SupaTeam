/**
 * API Service (Create React App)
 *
 * 1) Create `.env` at project root
 * 2) Set: REACT_APP_API_URL=https://YOUR-BACKEND.onrender.com
 * 3) Restart `npm start`
 */

// Authorization: Bearer <token>
const API_URL = process.env.REACT_APP_API_URL || "";
function authHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}
export async function login(credentials) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return handleRes(res);
}
// Protect ONLY addCard in this demo
export function addCard(card) {
  return fetch(`${API_URL}/addcard`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(card),
  });
}

async function handleRes(res) {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
  // If backend returns JSON (most common)
  return res.json().catch(() => ({}));
}

export async function getCards() {
  const res = await fetch(`${API_URL}/allcards`);
  return handleRes(res);
}

export async function updateCard(id, card) {
  const res = await fetch(`${API_URL}/editcard/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(), // Add auth token
    },
    body: JSON.stringify(card),
  });
  return handleRes(res);
}

export async function deleteCard(id) {
  const res = await fetch(`${API_URL}/deletecard/${id}`, {
    method: "DELETE",
    headers: {
      ...authHeader(), // Add auth token
    },
  });
  return handleRes(res);
}
