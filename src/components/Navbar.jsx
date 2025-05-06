import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "red" }}>
      <div className="container d-flex justify-content-between flex-wrap">
        <Link className="navbar-brand fw-bold text-white" to="/">
          FoodJet
        </Link>

        <ul className="navbar-nav d-flex flex-row flex-wrap ms-auto">
          <li className="nav-item mx-2">
            <Link className="nav-link text-white" to="/restaurants">
              Restaurants
            </Link>
          </li>
          <li className="nav-item mx-2">
            <Link className="nav-link text-white" to="/cart">
              Cart
            </Link>
          </li>
          <li className="nav-item mx-2">
            <Link className="nav-link text-white" to="/orders">
              Orders
            </Link>
          </li>
          <li className="nav-item mx-2">
            <Link className="nav-link text-white" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-item mx-2">
            <Link className="nav-link text-white" to="/signup">
              Signup
            </Link>
          </li>
          <li className="nav-item mx-2">
            <Link className="nav-link text-white" to="/yourfavourites">
              Your Favourites
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
