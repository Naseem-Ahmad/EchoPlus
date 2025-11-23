import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import WeatherWidget from "../components/WeatherWidget";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <>
    <div className="col-md-2">
      <WeatherWidget />
    </div>

        <div className="auth-page">
      <div className="auth-card">
        <h3 className="auth-title">Login</h3>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn btn-primary w-100 auth-btn">
            Login
          </button>
        </form>

        <p className="auth-bottom-text">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>   
  </>

  );
}
