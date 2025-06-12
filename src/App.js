import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Blogs from "./pages/Blogs";
import CreateBlog from "./pages/CreateBlog";
import MyBlogs from "./pages/MyBlogs";
import EditBlog from "./pages/EditBlog";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function AppContent() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <nav>
        <Link to="/">Blogs</Link> |{" "}
        <Link to="/create">Create</Link> |{" "}
        <Link to="/myblogs">My Blogs</Link> |{" "}
        {!token ? (
          <>
            <Link to="/signup">Signup</Link> |{" "}
            <Link to="/login">Login</Link>
          </>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<PrivateRoute><CreateBlog /></PrivateRoute>} />
        <Route path="/myblogs" element={<PrivateRoute><MyBlogs /></PrivateRoute>} />
        <Route path="/edit/:id" element={<PrivateRoute><EditBlog /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
