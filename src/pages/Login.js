import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const data = await login(formData); // Expects { token: "...", role: "..." }

            console.log("LOGIN RESPONSE DEBUG:", data);

            if (data.token) {
                localStorage.setItem("token", data.token);
                // If the backend returns a role, save it. Otherwise default to user
                localStorage.setItem("role", data.role || "user");

                navigate("/cards"); // Redirect to cards page
            } else {
                setError("Login failed: No token received. Check Console (F12) for details.");
            }
        } catch (err) {
            setError(err.message || "Invalid username or password");
        }
    };

    return (
        <main className="form-page">
            <div className="form-card">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {error && <p className="error-text">{error}</p>}
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </main>
    );
}
