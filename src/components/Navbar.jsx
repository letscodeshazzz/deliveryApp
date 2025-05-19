import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "react-bootstrap";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const location = useLocation();

  // Check if current route matches nav link
  const isActive = (path) => location.pathname === path;

  // Nav items configuration for cleaner code
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/restaurants", label: "Restaurants" },
  ];

  const protectedNavItems = [
    { path: "/cart", label: "Cart", icon: "bi-cart3" },
    { path: "/orders", label: "Orders", icon: "bi-receipt" },
    { path: "/profile", label: "Profile", icon: "bi-person" },
  ];

  // Nav link component to reduce repetition
  const NavLink = ({ path, label, icon }) => (
    <li className="nav-item">
      <Link 
        className="nav-link position-relative py-2 px-3 d-flex align-items-center" 
        to={path}
        style={{ 
          color: isActive(path) ? "#FFD700" : "#f8f9fa",
          fontWeight: isActive(path) ? "600" : "400"
        }}
      >
        {icon && <i className={`bi ${icon} me-1`}></i>}
        {label}
        {isActive(path) && (
          <span className="position-absolute bottom-0 start-50 translate-middle-x bg-warning" 
            style={{
              width: "60%",
              height: "2px",
              borderRadius: "2px"
            }}
          />
        )}
      </Link>
    </li>
  );


  return (
    <nav
  className="navbar navbar-expand-lg navbar-dark sticky-top"
  style={{
    position: "sticky", // Double safety
    top: 0,
    zIndex: 0,
    width: "100%",
      background: "rgb(250, 35, 35)",
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
            {/* Render public nav items */}
            {navItems.map((item) => (
              <NavLink key={item.path} {...item} />
            ))}

            {/* Render protected nav items if logged in */}
            {isLoggedIn ? (
              <>
                {protectedNavItems.map((item) => (
                  <NavLink key={item.path} {...item} />
                ))}
                <li className="nav-item d-flex align-items-center">
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
                <NavLink path="/login" label="Login" />
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