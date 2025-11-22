import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT
    navigate("/"); // redirect to login
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <a className="navbar-brand" href="/dashboard">My App</a>

      <div className="d-flex align-items-center">

        {isLoggedIn && (
          <>
            <a className="btn btn-outline-light me-3" href="/dashboard">Dashboard</a>
            <a className="btn btn-outline-light me-2" href="/products">Products</a>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
