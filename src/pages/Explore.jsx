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
      .catch((err) =>
        console.error(
          "Error fetching organizations:",
          err
        )
      );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      <Navbar />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        
        {/* HERO SECTION */}
        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 mb-6 sm:mb-8 overflow-hidden relative">
          
          {/* BLURS */}
          <div className="absolute top-0 right-0 w-40 sm:w-72 h-40 sm:h-72 bg-blue-100 rounded-full blur-3xl opacity-40"></div>

          <div className="absolute bottom-0 left-0 w-32 sm:w-60 h-32 sm:h-60 bg-indigo-100 rounded-full blur-3xl opacity-30"></div>

          <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
            
            {/* LEFT */}
            <div className="max-w-3xl">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                Explore Organizations 🌍
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-gray-500 mt-3 leading-relaxed">
                Discover startups, enterprises, MSMEs,
                and innovators. Connect, collaborate,
                and grow your business network.
              </p>
            </div>

            {/* RIGHT STATS */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              
              <div className="bg-blue-50 border border-blue-100 px-4 sm:px-5 py-3 sm:py-4 rounded-2xl min-w-[120px]">
                <h3 className="text-xl sm:text-2xl font-bold text-blue-600">
                  {organizations.length}
                </h3>

                <p className="text-xs sm:text-sm text-gray-500">
                  Organizations
                </p>
              </div>

              <div className="bg-indigo-50 border border-indigo-100 px-4 sm:px-5 py-3 sm:py-4 rounded-2xl min-w-[120px]">
                <h3 className="text-xl sm:text-2xl font-bold text-indigo-600">
                  Active
                </h3>

                <p className="text-xs sm:text-sm text-gray-500">
                  Networking
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ORGANIZATION GRID */}
        {organizations.length > 0 ? (
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-3">
            
            {organizations.map((org) => (
              <div
                key={org.id}
                className="group bg-white border border-gray-100 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                
                {/* TOP BANNER */}
                <div className="h-24 sm:h-28 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 relative">
                  
                  <div className="absolute -bottom-8 sm:-bottom-10 left-4 sm:left-6">
                    <div className="ring-4 ring-white rounded-full scale-90 sm:scale-100">
                      <Avatar name={org.name} />
                    </div>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="pt-12 sm:pt-14 p-4 sm:p-6">
                  
                  {/* HEADER */}
                  <div className="flex items-start justify-between gap-3">
                    
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 break-words">
                        {org.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-blue-500 font-medium mt-1 break-words">
                        {org.organizationType}
                      </p>
                    </div>

                    <div className="bg-green-100 text-green-600 text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-1 rounded-full shrink-0">
                      Active
                    </div>
                  </div>

                  {/* ABOUT */}
                  <p className="text-sm sm:text-base text-gray-600 mt-4 leading-relaxed line-clamp-4 min-h-[88px] sm:min-h-[96px] break-words">
                    {org.about}
                  </p>

                  {/* STATS */}
                  <div className="flex items-center justify-between mt-5 sm:mt-6 bg-gray-50 rounded-2xl px-3 sm:px-4 py-3">
                    
                    <div className="text-center flex-1">
                      <p className="text-base sm:text-lg font-bold text-gray-800">
                        24+
                      </p>

                      <p className="text-[10px] sm:text-xs text-gray-500">
                        Projects
                      </p>
                    </div>

                    <div className="w-px h-8 sm:h-10 bg-gray-200"></div>

                    <div className="text-center flex-1">
                      <p className="text-base sm:text-lg font-bold text-gray-800">
                        100%
                      </p>

                      <p className="text-[10px] sm:text-xs text-gray-500">
                        Verified
                      </p>
                    </div>

                    <div className="w-px h-8 sm:h-10 bg-gray-200"></div>

                    <div className="text-center flex-1">
                      <p className="text-base sm:text-lg font-bold text-gray-800">
                        4.9
                      </p>

                      <p className="text-[10px] sm:text-xs text-gray-500">
                        Rating
                      </p>
                    </div>
                  </div>

                  {/* BUTTON */}
                  <div className="mt-5 sm:mt-6">
                    <Link
                      to={`/organization/${org.id}`}
                      className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium text-sm sm:text-base px-4 sm:px-5 py-3 rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                    >
                      View Profile

                      <span className="text-base sm:text-lg">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-14 text-center">
            
            <div className="text-5xl sm:text-6xl mb-5">
              🏢
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              No Organizations Found
            </h2>

            <p className="text-sm sm:text-base text-gray-500 mt-3 max-w-md mx-auto leading-relaxed">
              It looks like there are no organizations
              available right now. Please check back
              later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}