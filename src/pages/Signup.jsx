import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    organizationType: "",
    about: "",
    ventures: "",
    ceoName: "",
    ceoBio: ""
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch existing organizations to find next ID
      const res = await API.get("/organizations");
      const existingUsers = res.data;
      const maxId = Math.max(...existingUsers.map(u => parseInt(u.id)), 0);
      const newId = (maxId + 1).toString();

      const newUser = {
        id: newId,
        ...form,
        ventures: form.ventures.split(",").map(v => v.trim()) // Convert comma-separated ventures to array
      };

      await API.post("/organizations", newUser);
      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      console.error("Error during signup:", err);
      alert("Failed to signup. Try again!");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <input
          type="text"
          name="name"
          placeholder="Organization Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          type="text"
          name="organizationType"
          placeholder="Organization Type (e.g. MSME, Startup)"
          value={form.organizationType}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <textarea
          name="about"
          placeholder="About the organization"
          value={form.about}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        ></textarea>

        <input
          type="text"
          name="ventures"
          placeholder="Ventures (comma separated)"
          value={form.ventures}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="text"
          name="ceoName"
          placeholder="CEO Name"
          value={form.ceoName}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <textarea
          name="ceoBio"
          placeholder="CEO Bio"
          value={form.ceoBio}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        ></textarea>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}