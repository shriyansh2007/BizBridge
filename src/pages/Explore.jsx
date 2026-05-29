import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Avatar from "../components/Avatar";

export default function Explore() {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    API.get("/organizations")
      .then((res) => {
        setOrganizations(res.data);
      })
      .catch((err) => console.error("Error fetching organizations:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* HERO SECTION */}
        <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-8 mb-8 overflow-hidden relative">
          
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-indigo-100 rounded-full blur-3xl opacity-30"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            
            <div>
              <h1 className="text-4xl font-bold text-gray-800 leading-tight">
                Explore Organizations 🌍
              </h1>

              <p className="text-gray-500 mt-3 max-w-2xl text-lg">
                Discover startups, enterprises, MSMEs, and innovators.
                Connect, collaborate, and grow your business network.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-blue-50 border border-blue-100 px-5 py-4 rounded-2xl">
                <h3 className="text-2xl font-bold text-blue-600">
                  {organizations.length}
                </h3>
                <p className="text-sm text-gray-500">Organizations</p>
              </div>

              <div className="bg-indigo-50 border border-indigo-100 px-5 py-4 rounded-2xl">
                <h3 className="text-2xl font-bold text-indigo-600">
                  Active
                </h3>
                <p className="text-sm text-gray-500">Networking</p>
              </div>
            </div>
          </div>
        </div>

        {/* ORGANIZATION GRID */}
        {organizations.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {organizations.map((org) => (
              <div
                key={org.id}
                className="group bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                
                {/* TOP BANNER */}
                <div className="h-28 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 relative">
                  
                  <div className="absolute -bottom-10 left-6">
                    <div className="ring-4 ring-white rounded-full">
                      <Avatar name={org.name} />
                    </div>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="pt-14 p-6">
                  
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                        {org.name}
                      </h3>

                      <p className="text-sm text-blue-500 font-medium mt-1">
                        {org.organizationType}
                      </p>
                    </div>

                    <div className="bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">
                      Active
                    </div>
                  </div>

                  {/* ABOUT */}
                  <p className="text-gray-600 mt-4 leading-relaxed line-clamp-4 min-h-[96px]">
                    {org.about}
                  </p>

                  {/* STATS */}
                  <div className="flex items-center justify-between mt-6 bg-gray-50 rounded-2xl px-4 py-3">
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-800">24+</p>
                      <p className="text-xs text-gray-500">Projects</p>
                    </div>

                    <div className="w-px h-10 bg-gray-200"></div>

                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-800">100%</p>
                      <p className="text-xs text-gray-500">Verified</p>
                    </div>

                    <div className="w-px h-10 bg-gray-200"></div>

                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-800">4.9</p>
                      <p className="text-xs text-gray-500">Rating</p>
                    </div>
                  </div>

                  {/* BUTTON */}
                  <div className="mt-6">
                    <Link
                      to={`/organization/${org.id}`}
                      className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium px-5 py-3 rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                    >
                      View Profile
                      <span className="text-lg">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-14 text-center">
            <div className="text-6xl mb-5">🏢</div>

            <h2 className="text-2xl font-bold text-gray-800">
              No Organizations Found
            </h2>

            <p className="text-gray-500 mt-3 max-w-md mx-auto">
              It looks like there are no organizations available right now.
              Please check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}