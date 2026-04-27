import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../api/auth.ts"; 

type User = { 
  id: string;
  email: string; 
  createdAt: string; 
}; 

export default function DashboardPage() {
  const navigate = useNavigate(); 

  const [user, setUser] = useState<User | null>(null); 
  const [error, setError] = useState(''); 
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const loadUser = async () => { 
      const token = localStorage.getItem('token'); 

      if(!token) {
        navigate('/login'); 
        return; 
      }
      try {
        const data = await getMe(token); 
        setUser(data.user); 
      } catch (error) {
        localStorage.removeItem("token");
        setError(error instanceof Error ? error.message : "Failed to load user");
      } finally {
        setIsLoading(false);
      }
    };
    loadUser(); 
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login'); 
  };

  if (isLoading) {
    return <main> Loading dashboard...</main>
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

      <button type='button' onClick={handleLogout}>
        Log out
      </button>
    </main>
  );
}