import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const MyBlogs = () => {
  const { token } = useContext(AuthContext);
  const [myBlogs, setMyBlogs] = useState([]);

  const BASE_URL = "http://192.168.57.155:5000"; // <- YEH LINE CHANGE KI HAI

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${BASE_URL}/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Blog deleted!");
      setMyBlogs((prev) => prev.filter((blog) => blog.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const fetchMyBlogs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/blogs/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyBlogs(res.data);
    } catch (err) {
      console.log("Error fetching my blogs:", err);
    }
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  return (
    <div>
      <h2>My Blogs</h2>
      {myBlogs.length === 0 ? (
        <p>You have not posted any blogs yet.</p>
      ) : (
        myBlogs.map((blog) => (
          <div key={blog.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <Link to={`/edit/${blog.id}`}><button>Edit</button></Link>
            <button onClick={() => handleDelete(blog.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBlogs;
