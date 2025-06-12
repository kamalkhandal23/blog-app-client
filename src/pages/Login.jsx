import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext"; // <-- import context

export default function Login() {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext); // <-- use login from context

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/login", inputs);

      // save token to context, not just localStorage
      login(res.data.token); // <-- ye important hai

      alert("Login successful");
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
