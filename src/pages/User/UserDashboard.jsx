import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editName, setEditName] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");

const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [changingPassword, setChangingPassword] = useState(false);
const [passwordMessage, setPasswordMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const checkSession = async () => {
      try {
        const API_URL = import.meta.env.DEV
          ? "http://localhost:5000"
          : import.meta.env.VITE_API_URL;

        if (!API_URL) {
          throw new Error("Backend URL is not configured.");
        }

        const response = await fetch(`${API_URL}/api/users/me`, {
          method: "GET",
          credentials: "include",
          signal: controller.signal,
        });

        if (response.status === 401 || response.status === 403) {
          navigate("/login", { replace: true });
          return;
        }

        if (!response.ok) {
          throw new Error("Session verification failed.");
        }

        const data = await response.json();
        setUser(data.user);
        setEditName(data.user.name);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Unable to verify your session. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    checkSession();

    return () => controller.abort();
  }, [navigate]);

const handleLogout = async () => {
  try {
    const API_URL = import.meta.env.DEV
      ? "http://localhost:5000"
      : import.meta.env.VITE_API_URL;

    if (!API_URL) {
      throw new Error("Backend URL is not configured.");
    }

    const response = await fetch(`${API_URL}/api/users/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Logout failed.");
    }

    navigate("/login", { replace: true });
  } catch (error) {
    console.error("Logout error:", error);
    setError("Unable to logout. Please try again.");
  }
};

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const name = editName.trim();

    if (name.length < 2 || name.length > 100) {
      setProfileMessage("Name must contain 2 to 100 characters.");
      return;
    }

    setSavingProfile(true);
    setProfileMessage("");

    try {
      const API_URL = import.meta.env.DEV
        ? "http://localhost:5000"
        : import.meta.env.VITE_API_URL;

      if (!API_URL) {
        throw new Error("Backend URL is not configured.");
      }

      const response = await fetch(`${API_URL}/api/users/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (response.status === 401 || response.status === 403) {
        setProfileMessage("Session expired. Please login again.");
        return;
      }

      if (!response.ok) {
        setProfileMessage(data.message || "Unable to update profile.");
        return;
      }

      setUser(data.user);
      setEditName(data.user.name);
      setProfileMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      setProfileMessage("Unable to connect to the server.");
    } finally {
      setSavingProfile(false);
    }
  };

const handleChangePassword = async (e) => {
  e.preventDefault();
  setPasswordMessage("");

  if (newPassword.length < 8 || newPassword.length > 128) {
    setPasswordMessage("Password must be 8 to 128 characters.");
    return;
  }

  if (newPassword !== confirmPassword) {
    setPasswordMessage("New passwords do not match.");
    return;
  }

  if (currentPassword === newPassword) {
    setPasswordMessage("New password must be different.");
    return;
  }

  setChangingPassword(true);

  try {
    const API_URL = import.meta.env.DEV
      ? "http://localhost:5000"
      : import.meta.env.VITE_API_URL;

    if (!API_URL) {
      throw new Error("Backend URL is not configured.");
    }

    const response = await fetch(
      `${API_URL}/api/users/change-password`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setPasswordMessage(
        data.message || "Unable to change password."
      );
      return;
    }

    setPasswordMessage("Password changed successfully!");
    navigate("/login", { replace: true });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  } catch (error) {
    console.error("Change password error:", error);
    setPasswordMessage("Unable to connect to the server.");
  } finally {
    setChangingPassword(false);
  }
};

  if (loading) {
    return <p role="status">Checking your session...</p>;
  }

  if (error) {
    return (
      <section className="user-auth-page">
        <div className="user-auth-card">
          <h2>Connection Error</h2>
          <p role="alert">{error}</p>
          <button onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </section>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <section className="nexora-dashboard">
      <div className="nexora-dashboard-container">

        {/* Dashboard Header */}
        <div className="nexora-dashboard-header">
          <div>
            <p className="dashboard-label">
              NEXORA TECHNOLOGIES
            </p>

            <h1>User Dashboard</h1>

            <p className="dashboard-subtitle">
              Manage your account and explore your dashboard.
            </p>
          </div>

          <button
            type="button"
            className="dashboard-logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        {/* Welcome Section */}
        <div className="nexora-welcome-card">
          <div className="dashboard-avatar">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2>Welcome back, {user.name}!</h2>
            <p>
              Your NEXORA Technologies account is active.
            </p>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="nexora-dashboard-grid">

          <div className="nexora-dashboard-card">
            <div className="dashboard-card-icon">👤</div>
            <h3>My Profile</h3>

            <p>
              <strong>Name:</strong> {user.name}
            </p>

            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <p>
              <strong>Role:</strong> {user.role}
            </p>
          </div>

          <div className="nexora-dashboard-card">
            <div className="dashboard-card-icon">⚙️</div>

           
<h3>Account Settings</h3>

<p>Update your personal information below.</p>

<form
  onSubmit={handleUpdateProfile}
  className="dashboard-profile-form"
>
  <label htmlFor="dashboard-edit-name">
    Full Name
  </label>

  <input
    id="dashboard-edit-name"
    type="text"
    value={editName}
    onChange={(e) => setEditName(e.target.value)}
    minLength={2}
    maxLength={100}
    autoComplete="name"
    required
  />

  <button
    type="submit"
    disabled={savingProfile}
    className="dashboard-save-btn"
  >
    {savingProfile ? "Saving..." : "Save Changes"}
  </button>

  {profileMessage && (
    <p role="status" aria-live="polite">
      {profileMessage}
    </p>
  )}
</form>

{/* Change Password Section */}
<div className="dashboard-password-section">
  <h3>Change Password</h3>

  <p>Update your account password securely.</p>

  <form
    onSubmit={handleChangePassword}
    className="dashboard-profile-form"
  >
    <label htmlFor="current-password">
      Current Password
    </label>

    <input
      id="current-password"
      type="password"
      value={currentPassword}
      onChange={(e) => setCurrentPassword(e.target.value)}
      autoComplete="current-password"
      required
    />

    <label htmlFor="new-password">
      New Password
    </label>

    <input
      id="new-password"
      type="password"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
      minLength={8}
      maxLength={128}
      autoComplete="new-password"
      required
    />

    <label htmlFor="confirm-password">
      Confirm New Password
    </label>

    <input
      id="confirm-password"
      type="password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      autoComplete="new-password"
      required
    />

    <button
      type="submit"
      className="dashboard-save-btn"
      disabled={changingPassword}
    >
      {changingPassword ? "Updating..." : "Change Password"}
    </button>

    {passwordMessage && (
      <p role="status" aria-live="polite">
        {passwordMessage}
      </p>
    )}
  </form>
</div>

          </div>

          <div className="nexora-dashboard-card">
            <div className="dashboard-card-icon">💬</div>

            <h3>Support Center</h3>

            <p>
              Need help? Contact the NEXORA Technologies
              support team.
            </p>

            <Link
              to="/contact"
              className="dashboard-action-link"
            >
              Contact Support
            </Link>
          </div>

        </div>

        {/* Footer */}
        <div className="nexora-dashboard-footer">
          <p>
            © {new Date().getFullYear()} NEXORA Technologies.
            All rights reserved.
          </p>

          <Link to="/">Back to Home</Link>
        </div>

      </div>
    </section>
  );
}


