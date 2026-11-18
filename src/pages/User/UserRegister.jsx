
import { useState } from "react";
import { Link } from "react-router-dom";

export default function UserRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (form.password !== form.confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  if (form.password.length < 8) {
    setError("Password must contain at least 8 characters.");
    return;
  }

  try {
    const API_URL = "http://localhost:5000";
      

    const response = await fetch(
      `${API_URL}/api/users/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Registration failed.");
      return;
    }

    alert("Account created successfully! Please login.");

    setForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

  } catch (error) {
    console.error("Registration request failed:", error);
    setError("Unable to connect to the server.");
  }
};


  return (
    <section className="user-auth-page">
      <div className="user-auth-card">
        <h1>Create Account</h1>
        <p>Join NEXORA Technologies.</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="register-name">Full Name</label>
          <input
            id="register-name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            autoComplete="name"
            required
          />

          <label htmlFor="register-email">Email Address</label>
          <input
            id="register-email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            autoComplete="email"
            required
          />

          <label htmlFor="register-password">Password</label>
          <input
            id="register-password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Create a password"
            autoComplete="new-password"
            minLength={8}
            required
          />

          <label htmlFor="register-confirm">Confirm Password</label>
          <input
            id="register-confirm"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            autoComplete="new-password"
            required
          />

          {error && <p role="alert">{error}</p>}

          <button type="submit">
            Create Account
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link to="/login">Login Here</Link>
        </p>
      </div>
    </section>
  );
}
