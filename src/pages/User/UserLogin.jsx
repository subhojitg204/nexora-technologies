
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
export default function UserLogin() {
const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const API_URL =
        import.meta.env.DEV
          ? "http://localhost:5000"
          : import.meta.env.VITE_API_URL;

      if (!API_URL) {
        throw new Error("Backend URL is not configured.");
      }

      const response = await fetch(`${API_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed.");
        return;
      }

     navigate("/dashboard", { replace: true });

      // User Dashboard route hum next step mein banayenge.

    } catch (err) {
      console.error("Login error:", err);
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="user-auth-page">
      <div className="user-auth-card">
        <h1>User Login</h1>
        <p>Welcome back to NEXORA Technologies.</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="user-email">Email Address</label>
          <input
            id="user-email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="user-password">Password</label>
          <input
            id="user-password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          
{error && (
  <p role="alert" className="auth-error">
    {error}
  </p>
)}

<button type="submit" disabled={loading}>
  {loading ? "Logging in..." : "Login"}
</button>

        </form>

        <p>
          Don't have an account?{" "}
          <Link to="/register">Create Account</Link>
        </p>
      </div>
    </section>
  );
}
