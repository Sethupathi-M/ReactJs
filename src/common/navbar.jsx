import React from "react";
import { NavLink, Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Vidly
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <NavLink className="nav-link" aria-current="page" to="/movies">
              Movies
            </NavLink>
            <NavLink className="nav-link" aria-current="page" to="/rentals">
              Rentals
            </NavLink>
            <NavLink className="nav-link" aria-current="page" to="/customers">
              Customers
            </NavLink>
            <NavLink className="nav-link" aria-current="page" to="/login">
              Login
            </NavLink>
            <NavLink className="nav-link" aria-current="page" to="/register">
              Register
            </NavLink>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
