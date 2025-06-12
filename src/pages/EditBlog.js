import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const EditBlog = () => {
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/blogs/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/blogs/${id}`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Blog updated!");
      navigate("/myblogs");
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div>
      <h2>Edit Blog</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          required
        />
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditBlog;
