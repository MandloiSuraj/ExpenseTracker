import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Login.css'; 
import { useNavigate } from "react-router-dom";
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    navigate("/expense");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Link to="/expense" ><button onClick={handleLogin}>Login</button></Link>
      <div>
        <p>Don't have an account? <Link to="/">Sign Up</Link></p>
      </div>
    </div>
  );
}

export default Login;
