import { useState } from 'react'; 
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/auth.ts'; 


export default function LoginPage() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    // stop the browser from doing the form’s default submit behavior, like reloading the page
    setError(''); 
    // clear out any old error message before starting a new login attempt
    setIsLoading(true);
    // mark the request as loading so the UI can show that work is in progress
    try{
      const data = await login(email, password); 
      localStorage.setItem('token', data.token); 
      navigate('/dashboard'); 
    } catch (error) { 
      setError(error instanceof Error ? error.message : 'login failed');
    } finally{
      setIsLoading(false)
    }
  };

  return (
    <main>
      <h1>Log In</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
          
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        {error && <p>{error}</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log In"}
        </button>
      </form>
      <p>
        Don&apos;t have an account? <Link to="/signup">Sign up</Link>
      </p>
    </main>

  );

}