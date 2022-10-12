import React from "react";

export default function Layout() {
  return (
    <nav className="navtop">
      <div>
        <h1>Website Title</h1>
        <a href="/home">
          <i className="fas fa-home"></i>Home
        </a>
        <a href="/profile">
          <i className="fas fa-user-circle"></i>Profile
        </a>
        <a href="/login">
          <i className="fas fa-sign-out-alt"></i>Logout
        </a>
      </div>
    </nav>
  );
}
