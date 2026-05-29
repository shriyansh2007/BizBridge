import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
    ceoBio: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.get("/organizations");
      const existingUsers = res.data;
      const maxId = Math.max(
        ...existingUsers.map((u) => parseInt(u.id)),
        0
      );

      const newId = (maxId + 1).toString();

      const newUser = {
        id: newId,
        ...form,
        ventures: form.ventures
          .split(",")
          .map((v) => v.trim()),
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-100 flex items-center justify-center px-4 py-10">
      
      {/* BACKGROUND BLURS */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-200 rounded-full blur-3xl opacity-30"></div>

      {/* CARD */}
      <div className="relative w-full max-w-5xl bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-white/40">
        
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* LEFT SIDE */}
          <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white p-12 relative overflow-hidden">
            
            <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 left-10 w-52 h-52 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="text-6xl mb-6">🚀</div>

              <h1 className="text-5xl font-bold leading-tight">
                Join
                <br />
                BizBridge
              </h1>

              <p className="mt-6 text-lg text-blue-100 leading-relaxed">
                Connect startups, MSMEs, and enterprises on one powerful
                networking platform.
              </p>

              <div className="mt-10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    🌍
                  </div>
                  <p>Expand your business network</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    🤝
                  </div>
                  <p>Collaborate with organizations</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    📈
                  </div>
                  <p>Grow your ventures faster</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="p-6 sm:p-10 md:p-12">
            
            <div className="mb-8">
              <div className="lg:hidden text-5xl mb-4">🚀</div>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Create Account
              </h2>

              <p className="text-gray-500 mt-2">
                Build your organization profile and connect with innovators.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              
              {/* ORGANIZATION NAME */}
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Organization Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter organization name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 px-4 py-3 rounded-2xl outline-none transition-all duration-300"
                  required
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 px-4 py-3 rounded-2xl outline-none transition-all duration-300"
                  required
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  placeholder="Create a secure password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 px-4 py-3 rounded-2xl outline-none transition-all duration-300"
                  required
                />
              </div>

              {/* ORG TYPE */}
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Organization Type
                </label>

                <input
                  type="text"
                  name="organizationType"
                  placeholder="Startup, MSME, Enterprise..."
                  value={form.organizationType}
                  onChange={handleChange}
                  className="w-full border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 px-4 py-3 rounded-2xl outline-none transition-all duration-300"
                  required
                />
              </div>

              {/* ABOUT */}
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  About Organization
                </label>

                <textarea
                  name="about"
                  placeholder="Tell people about your organization..."
                  value={form.about}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 px-4 py-3 rounded-2xl outline-none transition-all duration-300 resize-none"
                  required
                ></textarea>
              </div>

              {/* VENTURES */}
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Ventures
                </label>

                <input
                  type="text"
                  name="ventures"
                  placeholder="AI Platform, Fintech App, SaaS..."
                  value={form.ventures}
                  onChange={handleChange}
                  className="w-full border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 px-4 py-3 rounded-2xl outline-none transition-all duration-300"
                />
              </div>

              {/* CEO NAME */}
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  CEO Name
                </label>

                <input
                  type="text"
                  name="ceoName"
                  placeholder="Enter CEO name"
                  value={form.ceoName}
                  onChange={handleChange}
                  className="w-full border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 px-4 py-3 rounded-2xl outline-none transition-all duration-300"
                  required
                />
              </div>

              {/* CEO BIO */}
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  CEO Bio
                </label>

                <textarea
                  name="ceoBio"
                  placeholder="Write a short CEO bio..."
                  value={form.ceoBio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 px-4 py-3 rounded-2xl outline-none transition-all duration-300 resize-none"
                  required
                ></textarea>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-2xl hover:scale-[1.01] transition-all duration-300"
              >
                Create Account
              </button>
            </form>

            {/* LOGIN LINK */}
            <p className="text-center text-gray-500 mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}