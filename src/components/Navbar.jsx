import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "react-bootstrap";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" 
    style={{ background: "rgb(250, 35, 35)" }}>
      <div className="container">
        <Link className="navbar-brand fw-bold text-warning" to="/">Foodjet</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
 
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ color: "#f8f9fa",  }}>
                Home
              </Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/restaurants" style={{ color: "#f8f9fa" }}>
                Restaurants
              </Link>
            </li>

            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart" style={{ color: "#f0f0f0" }}>
                    Cart
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/orders" style={{ color: "#f0f0f0" }}>
                    Orders
                  </Link>
                </li>
                <li className="nav-item">
                  <Button variant="link" className="nav-link text-white" onClick={logout}>Logout</Button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" style={{ color: "#f0f0f0" }}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup" style={{ color: "#f0f0f0" }}>
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
