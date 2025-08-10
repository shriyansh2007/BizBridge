import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", organizationType: "MSME" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/organizations", form);
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl mb-4 font-bold">Sign Up</h2>
        <input placeholder="Name" className="input" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" className="input" onChange={e => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" className="input" onChange={e => setForm({ ...form, password: e.target.value })} />
        <select className="input" onChange={e => setForm({ ...form, organizationType: e.target.value })}>
          <option>MSME</option>
          <option>Enterprise</option>
        </select>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-3 w-full">Sign Up</button>
      </form>
    </div>
  );
}
