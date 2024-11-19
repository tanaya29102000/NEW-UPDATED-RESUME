
import React from "react";
import {  NavLink } from "react-router-dom"; // Use NavLink for active link styles
import "./Sildenavbar.css";

const Slidenavbar = () => {
  return (
    <div className="slidenavbar-container">
      <header className="header">
        <p className="slidenavbar-title">Welcome to Account Settings</p>
      </header>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink
              to="/account-settings/general"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              General Account Settings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/account-settings/privacy"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Privacy Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Slidenavbar;
