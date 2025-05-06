import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{
        background: "Red", // Main background color
        width: "100vw",
        height:"5vw", //
        //  Adjusted to ensure the navbar fits within the container
       
      }}
    >
      <div className="container">
        <Link className="navbar-brand text-white fw-bold" to="/">
          FoodJet
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto mb-5 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/restaurants">
                Restaurants
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/cart">
                Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/orders">
                Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/signup">
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/yourfavourites">
                Your favourites
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
