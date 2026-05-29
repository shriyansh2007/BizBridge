import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await API.get("/organizations");

    const user = data.find(
      (u) =>
        u.email === form.email &&
        u.password === form.password
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/feed");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-100 flex items-center justify-center px-4 py-10 overflow-hidden relative">
      
      {/* BACKGROUND BLURS */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-300 rounded-full blur-3xl opacity-20"></div>

      {/* MAIN CARD */}
      <div className="relative w-full max-w-5xl bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/40">
        
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* LEFT SIDE */}
          <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white p-12 relative overflow-hidden">
            
            {/* DECOR */}
            <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 left-10 w-52 h-52 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="text-6xl mb-6">🌐</div>

              <h1 className="text-5xl font-bold leading-tight">
                Welcome
                <br />
                Back
              </h1>

              <p className="mt-6 text-lg text-blue-100 leading-relaxed">
                Login to BizBridge and continue building powerful business
                collaborations and opportunities.
              </p>

              {/* FEATURES */}
              <div className="mt-10 space-y-4">
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    🚀
                  </div>

                  <p>Discover innovative organizations</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    🤝
                  </div>

                  <p>Collaborate with startups & enterprises</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    📈
                  </div>

                  <p>Expand your professional network</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="p-6 sm:p-10 md:p-12 flex flex-col justify-center">
            
            {/* HEADER */}
            <div className="mb-8">
              <div className="lg:hidden text-5xl mb-4">🌐</div>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Login
              </h2>

              <p className="text-gray-500 mt-2">
                Access your organization dashboard and network.
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              
              {/* EMAIL */}
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
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
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                  className="w-full border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 px-4 py-3 rounded-2xl outline-none transition-all duration-300"
                  required
                />
              </div>

              {/* FORGOT PASSWORD */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot Password?
                </button>
              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-2xl hover:scale-[1.01] transition-all duration-300"
              >
                Login to BizBridge
              </button>
            </form>

            {/* SIGNUP LINK */}
            <p className="text-center text-gray-500 mt-6">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                Create Account
              </Link>
            </p>

            {/* MOBILE INFO CARD */}
            <div className="lg:hidden mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5">
              
              <div className="flex items-start gap-4">
                <div className="text-3xl">🚀</div>

                <div>
                  <h3 className="font-bold text-gray-800">
                    Grow with BizBridge
                  </h3>

                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    Connect startups, MSMEs, and enterprises in one smart
                    networking ecosystem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}