
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Admin() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  // Load customer inquiries from the protected API
  useEffect(() => {
    let cancelled = false;

    async function loadMessages() {
      try {
        const response = await fetch(
          `${API_URL}/api/admin/messages`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.status === 401 || response.status === 403) {
          if (!cancelled) {
            navigate("/admin/login", { replace: true });
          }
          return;
        }

        if (!response.ok) {
          throw new Error("Unable to load customer inquiries.");
        }

        const data = await response.json();

        if (!cancelled) {
          setMessages(
            Array.isArray(data.messages) ? data.messages : []
          );
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.message || "Unable to connect to the backend."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadMessages();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  // Filter messages by name, email, or subject
  const filteredMessages = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return messages;
    }

    return messages.filter((item) =>
      [item.name, item.email, item.subject]
        .some((value) =>
          String(value ?? "").toLowerCase().includes(query)
        )
    );
  }, [messages, search]);

async function handleStatusChange(id, newStatus) {
  const previousMessages = messages;

  setMessages((current) =>
    current.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    )
  );

  try {
    const response = await fetch(
      `${API_URL}/api/admin/messages/${id}/status`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      }
    );

    if (response.status === 401 || response.status === 403) {
      navigate("/admin/login", { replace: true });
      return;
    }

    if (!response.ok) {
      throw new Error("Unable to update message status.");
    }
  } catch (error) {
    setMessages(previousMessages);
    setError("Failed to update status. Please try again.");
  }
}

  // Log out and clear the browser session
  async function handleLogout() {
    setLoggingOut(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/admin/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Unable to log out.");
      }

      setMessages([]);
      navigate("/admin/login", { replace: true });
    } catch {
      setError("Logout failed. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <main className="admin-dashboard">
      <header className="admin-header">
        <div>
          <h1>NEXORA Admin Dashboard</h1>
          <p>
            Manage customer inquiries submitted through your website.
          </p>
        </div>

        <button
          className="admin-logout"
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
        >
          {loggingOut ? "Logging out..." : "Logout"}
        </button>
      </header>

      {error && <p role="alert">{error}</p>}

      {loading ? (
        <p role="status">Loading customer inquiries...</p>
      ) : (
        <>
          <section
            className="admin-stats"
            aria-label="Inquiry statistics"
          >
            <div className="admin-stat-card">
              <h2>Loaded Inquiries</h2>
              <p>{messages.length}</p>
            </div>

            <div className="admin-stat-card">
              <h2>Search Results</h2>
              <p>{filteredMessages.length}</p>
            </div>
          </section>

          <section
            className="admin-panel"
            aria-labelledby="inquiries-heading"
          >
            <h2 id="inquiries-heading">Customer Inquiries</h2>

            <label htmlFor="admin-search">
              Search customer inquiries
            </label>

            <input
              id="admin-search"
              className="admin-search"
              type="search"
              placeholder="Search by name, email, or subject..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            {filteredMessages.length === 0 ? (
              <p>
                {search
                  ? "No inquiries match your search."
                  : "No customer inquiries found."}
              </p>
            ) : (
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Subject</th>
                      <th scope="col">Message</th>
                      <th scope="col">Status</th>
                      <th scope="col">Status</th>
                      <th scope="col">Date</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredMessages.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.subject}</td>
                        <td className="admin-message-cell">
                          {item.message}
                        </td>

<td>
  <select
    value={item.status || "New"}
    onChange={(event) =>
      handleStatusChange(item.id, event.target.value)
    }
    aria-label={`Status for inquiry ${item.id}`}
    className="admin-status-select"
  >
    <option value="New">New</option>
    <option value="In Progress">In Progress</option>
    <option value="Resolved">Resolved</option>
  </select>
</td>

                        <td>
                          {item.created_at
                            ? new Date(
                                item.created_at
                              ).toLocaleString()
                            : "N/A"}
                        </td>
                        <td>
                          <button
                            onClick={() => setSelectedMessage(item)}
                            aria-label={`View details for ${item.name}`}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}
   
{selectedMessage && (
  <section
    className="admin-details"
    aria-labelledby="message-details-heading"
  >
    <div className="admin-details-header">
      <h2 id="message-details-heading">Inquiry Details</h2>

      <button
        type="button"
        onClick={() => setSelectedMessage(null)}
        aria-label="Close inquiry details"
      >
        Close
      </button>
    </div>

    <p><strong>Name:</strong> {selectedMessage.name}</p>
    <p><strong>Email:</strong> {selectedMessage.email}</p>
    <p><strong>Phone:</strong> {selectedMessage.phone || "Not provided"}</p>
    <p><strong>Subject:</strong> {selectedMessage.subject}</p>
    <p><strong>Message:</strong></p>
    <p className="admin-details-message">
      {selectedMessage.message}
    </p>
    <p>
      <strong>Submitted:</strong>{" "}
      {selectedMessage.created_at
        ? new Date(selectedMessage.created_at).toLocaleString()
        : "N/A"}
    </p>
  </section>
)}

    </main>
  );
}
