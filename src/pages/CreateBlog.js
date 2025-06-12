import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const CreateBlog = () => {
  const { token } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/blogs",
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Blog created successfully!");
      setTitle("");
      setContent("");
    } catch (err) {
      console.error("Error creating blog:", err);
      alert("Failed to create blog");
    }
  };

  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Enter content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          required
        />
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateBlog;
