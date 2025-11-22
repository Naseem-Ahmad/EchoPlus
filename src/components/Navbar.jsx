import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar custom-nav shadow-sm px-4">
      <span className="navbar-brand app-name" style={{ color: "white" }} onClick={() => navigate("/dashboard")}>
        Echo Plus
      </span>

      <div>
        {!isLoggedIn && (
          <>
            <button className="btn btn-outline-primary me-2" onClick={() => navigate("/")}>
              Login
            </button>
            <button className="btn btn-primary" onClick={() => navigate("/register")}>
              Register
            </button>
          </>
        )}

        {isLoggedIn && (
          <>
            <button className="btn btn-outline-primary me-3" onClick={() => navigate("/dashboard")}>
              Dashboard
            </button>

            <button className="btn btn-outline-primary me-3" onClick={() => navigate("/products")}>
              Products
            </button>

            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
