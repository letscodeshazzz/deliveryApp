import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "react-bootstrap";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const location = useLocation();

  // Check if current route matches nav link
  const isActive = (path) => location.pathname === path;

  return (
    <nav 
      className="navbar navbar-expand-lg navbar-dark sticky-top" 
      style={{ 
        background: "rgb(250, 35, 35)",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
      }}
    >
      <div className="container">
        <Link 
          className="navbar-brand fw-bold d-flex align-items-center" 
          to="/"
          style={{ 
            color: "#FFD700",
            fontSize: "1.5rem",
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: "1px"
          }}
        >
          <i className="bi bi-egg-fried me-2"></i>
          Foodjet
        </Link>
        
        <button
          className="navbar-toggler border-0"
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
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-3">
            <li className="nav-item">
              <Link 
                className="nav-link position-relative py-2 px-3" 
                to="/"
                style={{ 
                  color: isActive("/") ? "#FFD700" : "#f8f9fa",
                  fontWeight: isActive("/") ? "600" : "400"
                }}
              >
                Home
                {isActive("/") && (
                  <span className="position-absolute bottom-0 start-50 translate-middle-x bg-warning" 
                    style={{
                      width: "60%",
                      height: "2px",
                      borderRadius: "2px"
                    }}
                  ></span>
                )}
              </Link>
            </li>
            
            <li className="nav-item">
              <Link 
                className="nav-link position-relative py-2 px-3" 
                to="/restaurants"
                style={{ 
                  color: isActive("/restaurants") ? "#FFD700" : "#f8f9fa",
                  fontWeight: isActive("/restaurants") ? "600" : "400"
                }}
              >
                Restaurants
                {isActive("/restaurants") && (
                  <span className="position-absolute bottom-0 start-50 translate-middle-x bg-warning" 
                    style={{
                      width: "60%",
                      height: "2px",
                      borderRadius: "2px"
                    }}
                  ></span>
                )}
              </Link>
            </li>

            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link 
                    className="nav-link position-relative py-2 px-3" 
                    to="/cart"
                    style={{ 
                      color: isActive("/cart") ? "#FFD700" : "#f8f9fa",
                      fontWeight: isActive("/cart") ? "600" : "400"
                    }}
                  >
                    <i className="bi bi-cart3 me-1"></i>
                    Cart
                    {isActive("/cart") && (
                      <span className="position-absolute bottom-0 start-50 translate-middle-x bg-warning" 
                        style={{
                          width: "60%",
                          height: "2px",
                          borderRadius: "2px"
                        }}
                      ></span>
                    )}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    className="nav-link position-relative py-2 px-3" 
                    to="/orders"
                    style={{ 
                      color: isActive("/orders") ? "#FFD700" : "#f8f9fa",
                      fontWeight: isActive("/orders") ? "600" : "400"
                    }}
                  >
                    <i className="bi bi-receipt me-1"></i>
                    Orders
                    {isActive("/orders") && (
                      <span className="position-absolute bottom-0 start-50 translate-middle-x bg-warning" 
                        style={{
                          width: "60%",
                          height: "2px",
                          borderRadius: "2px"
                        }}
                      ></span>
                    )}
                  </Link>
                </li>
                <li className="nav-item">
                  <Button 
                    variant="outline-warning" 
                    className="rounded-pill px-3 fw-medium ms-lg-2 mt-2 mt-lg-0"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link 
                    className="nav-link position-relative py-2 px-3" 
                    to="/login"
                    style={{ 
                      color: isActive("/login") ? "#FFD700" : "#f8f9fa",
                      fontWeight: isActive("/login") ? "600" : "400"
                    }}
                  >
                    Login
                    {isActive("/login") && (
                      <span className="position-absolute bottom-0 start-50 translate-middle-x bg-warning" 
                        style={{
                          width: "60%",
                          height: "2px",
                          borderRadius: "2px"
                        }}
                      ></span>
                    )}
                  </Link>
                </li>
                <li className="nav-item">
                  <Button 
                    as={Link} 
                    to="/signup" 
                    variant="warning" 
                    className="rounded-pill px-3 fw-medium ms-lg-2 mt-2 mt-lg-0"
                  >
                    Sign Up
                  </Button>
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