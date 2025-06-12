import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: "10px" }}>Blogs</Link>
      {token && (
        <>
          <Link to="/create" style={{ marginRight: "10px" }}>Create</Link>
          <Link to="/myblogs" style={{ marginRight: "10px" }}>My Blogs</Link>
        </>
      )}
      {!token ? (
        <>
          <Link to="/signup" style={{ marginRight: "10px" }}>Signup</Link>
          <Link to="/login">Login</Link>
        </>
      ) : (
        <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
