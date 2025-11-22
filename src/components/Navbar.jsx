import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // redirect to login
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/dashboard">
        My App
      </Link>

      <div className="d-flex align-items-center">
        {isLoggedIn && (
          <>
            <Link className="btn btn-outline-light me-3" to="/dashboard">
              Dashboard
            </Link>

            <Link className="btn btn-outline-light me-2" to="/products">
              Products
            </Link>

            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
