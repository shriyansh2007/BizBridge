import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await API.get("/organizations");
    const user = data.find(u => u.email === form.email && u.password === form.password);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/feed");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl mb-4 font-bold">Login</h2>
        <input placeholder="Email" className="input" onChange={e => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" className="input" onChange={e => setForm({ ...form, password: e.target.value })} />
        <button className="bg-green-500 text-white px-4 py-2 rounded mt-3 w-full">Login</button>
      </form>
    </div>
  );
}
