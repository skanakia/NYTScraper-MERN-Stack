import React from "react";
import { Link } from "react-router-dom";
// import "./Navbar.css";
import ScrapeBtn from "../ScrapeBtn"
import ClearBtn from "../ClearBtn"

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
const Navbar = props => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link className="navbar-brand" to="/">
      NYT Scraper
    </Link>
    <div>
      <ul className="navbar-nav">
        <li
          className={
            window.location.pathname === "/"
              ? "nav-item active"
              : "nav-item"
          }
        >
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li
          className={
            window.location.pathname === "/saved"
              ? "nav-item active"
              : "nav-item"
          }
        >
          <Link to="/saved" className="nav-link">
            Saved Articles
          </Link>
        </li>
        <li>
            <ScrapeBtn onClick={props.onClick}/>
        </li>
        <li>
            <ClearBtn />
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;