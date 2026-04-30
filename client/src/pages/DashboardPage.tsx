import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMe } from "../api/auth";
import { getItems } from "../api/items";
import type { Item } from "../types/item";
import type { User } from "../types/user";




export default function DashboardPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const [userData, itemsData] = await Promise.all([
          getMe(token),
          getItems(token),
        ]);

        setUser(userData.user);
        setItems(itemsData.items);
      } catch (error) {
        localStorage.removeItem("token");
        setError(
          error instanceof Error ? error.message : "Failed to load dashboard"
        );
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (isLoading) {
    return <main>Loading dashboard...</main>;
  }

  if (error) {
    return <main>{error}</main>;
  }

  return (
    <main>
      <h1>Dashboard</h1>

      {user && (
        <section>
          <p>Welcome, {user.email}</p>
          <p>User ID: {user.id}</p>
        </section>
      )}

      <button type="button" onClick={handleLogout}>
        Log out
      </button>

      <section>
        <h2>Your Saved Items</h2>

        {items.length === 0 ? (
          <p>You have not saved any items yet.</p>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <h3>
                  <Link to={`/items/${item.id}`}>{item.title}</Link>
                </h3>
                <p>{item.aiSummary || "No summary available."}</p>

                {item.userNote && <p>Note: {item.userNote}</p>}

                {item.tags.length > 0 && (
                  <p>Tags: {item.tags.join(", ")}</p>
                )}

                <a href={item.url} target="_blank" rel="noreferrer">
                  Open source
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}