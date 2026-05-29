import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Avatar from "../components/Avatar";

export default function Profile() {
  const { id } = useParams();
  const [org, setOrg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrg = async () => {
      try {
        const res = await API.get("/organizations");
        const foundOrg = res.data.find(
          (o) => String(o.id) === String(id)
        );

        if (!foundOrg) {
          setError("Organization not found!");
        } else {
          setOrg(foundOrg);
        }
      } catch (err) {
        console.error(
          "Error fetching organization:",
          err
        );
        setError(
          "Failed to fetch organization data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrg();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4">
        <div className="bg-white shadow-xl rounded-3xl px-6 sm:px-8 py-6 text-center border border-gray-100 w-full max-w-sm">
          
          <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="text-base sm:text-lg font-semibold text-gray-700 mt-5">
            Loading organization...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-red-50 px-4">
        
        <div className="bg-white shadow-xl rounded-3xl p-6 sm:p-8 text-center border border-red-100 max-w-md w-full">
          
          <div className="text-5xl sm:text-6xl mb-4">
            ⚠️
          </div>

          <p className="text-red-500 text-lg sm:text-xl font-semibold break-words">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
        
        <Navbar />

        <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
          
          {/* HERO SECTION */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            
            {/* COVER */}
            <div className="h-40 sm:h-52 md:h-72 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative">
              
              <div className="absolute inset-0 bg-black/10"></div>

              <div className="absolute -bottom-10 sm:-bottom-12 left-4 sm:left-6 md:left-10">
                
                <div className="ring-4 ring-white rounded-full bg-white shadow-xl scale-90 sm:scale-100">
                  <Avatar name={org.name} />
                </div>
              </div>
            </div>

            {/* PROFILE CONTENT */}
            <div className="pt-14 sm:pt-16 px-4 sm:px-6 md:px-10 pb-6 sm:pb-8">
              
              <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6">
                
                {/* LEFT */}
                <div className="min-w-0">
                  
                  <div className="flex items-center gap-3 flex-wrap">
                    
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-800 break-words">
                      {org.name}
                    </h1>

                    <span className="bg-green-100 text-green-600 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1 rounded-full whitespace-nowrap">
                      Verified
                    </span>
                  </div>

                  <p className="mt-3 text-base sm:text-lg text-blue-600 font-medium break-words">
                    {org.organizationType}
                  </p>

                  <p className="mt-4 text-gray-600 max-w-3xl leading-relaxed text-sm sm:text-base md:text-lg break-words">
                    {org.about ||
                      "No about info yet."}
                  </p>
                </div>

                {/* RIGHT STATS */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full xl:w-auto">
                  
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl px-3 sm:px-5 py-3 sm:py-4 text-center">
                    
                    <h3 className="text-lg sm:text-2xl font-bold text-blue-600">
                      24+
                    </h3>

                    <p className="text-[10px] sm:text-sm text-gray-500">
                      Projects
                    </p>
                  </div>

                  <div className="bg-indigo-50 border border-indigo-100 rounded-2xl px-3 sm:px-5 py-3 sm:py-4 text-center">
                    
                    <h3 className="text-lg sm:text-2xl font-bold text-indigo-600">
                      4.9
                    </h3>

                    <p className="text-[10px] sm:text-sm text-gray-500">
                      Rating
                    </p>
                  </div>

                  <div className="bg-purple-50 border border-purple-100 rounded-2xl px-3 sm:px-5 py-3 sm:py-4 text-center">
                    
                    <h3 className="text-lg sm:text-2xl font-bold text-purple-600">
                      100%
                    </h3>

                    <p className="text-[10px] sm:text-sm text-gray-500">
                      Trusted
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CONTENT GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
            
            {/* LEFT CONTENT */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              
              {/* ABOUT ORGANIZATION */}
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 p-5 sm:p-6 md:p-8">
                
                <div className="flex items-center gap-3 mb-5">
                  
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-xl sm:text-2xl shrink-0">
                    🏢
                  </div>

                  <div className="min-w-0">
                    
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 break-words">
                      About the Organization
                    </h2>

                    <p className="text-gray-500 text-xs sm:text-sm">
                      Company overview & mission
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg break-words">
                  {org.about ||
                    "No about information available."}
                </p>
              </div>

              {/* VENTURES */}
              {org.ventures?.length > 0 && (
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 p-5 sm:p-6 md:p-8">
                  
                  <div className="flex items-center gap-3 mb-6">
                    
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-xl sm:text-2xl shrink-0">
                      🚀
                    </div>

                    <div className="min-w-0">
                      
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 break-words">
                        Ventures & Projects
                      </h2>

                      <p className="text-gray-500 text-xs sm:text-sm">
                        Current initiatives by the organization
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {org.ventures.map((v, i) => (
                      <div
                        key={i}
                        className="bg-gradient-to-r from-slate-50 to-blue-50 border border-gray-100 rounded-2xl p-4 sm:p-5 hover:shadow-md transition-all duration-300"
                      >
                        
                        <div className="flex items-start gap-3 sm:gap-4">
                          
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center font-bold shrink-0">
                            {i + 1}
                          </div>

                          <div className="min-w-0">
                            
                            <h3 className="font-semibold text-gray-800 text-base sm:text-lg break-words">
                              {v}
                            </h3>

                            <p className="text-gray-500 text-xs sm:text-sm mt-1">
                              Innovative business initiative by the organization
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="space-y-4 sm:space-y-6">
              
              {/* CEO CARD */}
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 p-5 sm:p-6">
                
                <div className="flex items-center gap-3 mb-6">
                  
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-xl sm:text-2xl shrink-0">
                    👨‍💼
                  </div>

                  <div className="min-w-0">
                    
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 break-words">
                      CEO Profile
                    </h2>

                    <p className="text-gray-500 text-xs sm:text-sm">
                      Leadership & vision
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center text-center">
                  
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg">
                    {org.ceoName?.charAt(0)}
                  </div>

                  <h3 className="mt-5 text-xl sm:text-2xl font-bold text-gray-800 break-words">
                    {org.ceoName}
                  </h3>

                  <p className="text-blue-500 font-medium mt-1 text-sm sm:text-base">
                    Chief Executive Officer
                  </p>

                  <div className="w-full h-px bg-gray-100 my-6"></div>

                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base break-words">
                    {org.ceoBio ||
                      "No CEO bio available."}
                  </p>
                </div>
              </div>

              {/* NETWORK CARD */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-white shadow-xl">
                
                <h2 className="text-xl sm:text-2xl font-bold">
                  Connect & Collaborate 🤝
                </h2>

                <p className="text-blue-100 mt-3 leading-relaxed text-sm sm:text-base">
                  Build partnerships, discover
                  opportunities, and grow your
                  business network with innovative
                  organizations.
                </p>

                <button className="mt-6 bg-white text-blue-600 font-semibold px-5 py-3 rounded-2xl hover:bg-blue-50 transition-all duration-300 w-full text-sm sm:text-base">
                  Connect Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}