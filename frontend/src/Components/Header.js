import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to="/" className="title">
        <img
          className="ImageNavbrsixecontrol"
          src="/images/footerlogo.webp"
          alt=""
        />
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="https://revnitro.com/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/">Blog</NavLink>
        </li>
        <li>
          <NavLink to="https://forum.revnitro.com/" target="_blank">
            Forum
          </NavLink>
        </li>
        <li>
          <NavLink to="/Team">Jobs</NavLink>
        </li>
        <li>
          <NavLink to="/Shop">Team</NavLink>
        </li>
        <li>
          <NavLink to="/Shop">Events</NavLink>
        </li>
      </ul>
    </nav>
  );
};
