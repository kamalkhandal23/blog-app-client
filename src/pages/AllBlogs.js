import { useEffect, useState } from "react";
import axios from "axios";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.log("Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <h2>All Blogs</h2>
      {blogs.length === 0 ? (
        <p>No blogs yet.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <small>By: {blog.author}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default AllBlogs;
