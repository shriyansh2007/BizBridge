import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function OrganizationProfile() {
  const { id } = useParams();
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/organizations/${id}`)
      .then((res) => {
        setOrganization(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching organization:", err);
        setLoading(false);
      });
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

  if (!organization) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-pink-50 px-4">
        <div className="bg-white shadow-xl rounded-3xl p-6 sm:p-8 text-center border border-red-100 max-w-md w-full">
          <div className="text-5xl sm:text-6xl mb-4">⚠️</div>

          <p className="text-red-500 text-lg sm:text-xl font-semibold">
            Organization not found!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-x-hidden">
      <Navbar />

      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        
        {/* HERO SECTION */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* COVER */}
          <div className="relative h-48 sm:h-56 md:h-72 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            
            <div className="absolute inset-0 bg-black/10"></div>

            {/* Floating Shapes */}
            <div className="absolute top-10 right-10 w-20 sm:w-24 h-20 sm:h-24 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 left-10 w-24 sm:w-32 h-24 sm:h-32 bg-white/10 rounded-full blur-2xl"></div>

            {/* ORG ICON */}
            <div className="absolute -bottom-12 sm:-bottom-14 left-4 sm:left-6 md:left-10">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl sm:rounded-3xl bg-white shadow-2xl border-4 border-white flex items-center justify-center">
                <span className="text-4xl sm:text-5xl md:text-6xl">
                  🏢
                </span>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="pt-16 sm:pt-20 px-4 sm:px-6 md:px-10 pb-6 sm:pb-8">
            
            <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6">
              
              {/* LEFT */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-800 break-words">
                    {organization.name}
                  </h1>

                  <span className="bg-green-100 text-green-600 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1 rounded-full">
                    Verified
                  </span>
                </div>

                <p className="mt-3 text-base sm:text-lg font-medium text-blue-600">
                  {organization.organizationType}
                </p>

                <p className="mt-4 sm:mt-5 text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg max-w-3xl">
                  {organization.about}
                </p>
              </div>

              {/* RIGHT STATS */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full xl:w-auto">
                <div className="bg-blue-50 border border-blue-100 rounded-xl sm:rounded-2xl px-3 sm:px-5 py-3 sm:py-4 text-center">
                  <h3 className="text-lg sm:text-2xl font-bold text-blue-600">
                    24+
                  </h3>
                  <p className="text-[10px] sm:text-sm text-gray-500">
                    Projects
                  </p>
                </div>

                <div className="bg-indigo-50 border border-indigo-100 rounded-xl sm:rounded-2xl px-3 sm:px-5 py-3 sm:py-4 text-center">
                  <h3 className="text-lg sm:text-2xl font-bold text-indigo-600">
                    4.9
                  </h3>
                  <p className="text-[10px] sm:text-sm text-gray-500">
                    Rating
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-100 rounded-xl sm:rounded-2xl px-3 sm:px-5 py-3 sm:py-4 text-center">
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

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
          
          {/* LEFT CONTENT */}
          <div className="xl:col-span-2 space-y-4 sm:space-y-6">
            
            {/* ABOUT */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 p-4 sm:p-6 md:p-8">
              
              <div className="flex items-start sm:items-center gap-3 mb-5 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-100 flex items-center justify-center text-xl sm:text-2xl shrink-0">
                  📄
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    About Organization
                  </h2>

                  <p className="text-gray-500 text-xs sm:text-sm">
                    Company overview & mission
                  </p>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg">
                {organization.about}
              </p>
            </div>

            {/* VENTURES */}
            {Array.isArray(organization.ventures) &&
              organization.ventures.length > 0 && (
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 p-4 sm:p-6 md:p-8">
                  
                  <div className="flex items-start sm:items-center gap-3 mb-5 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-indigo-100 flex items-center justify-center text-xl sm:text-2xl shrink-0">
                      🚀
                    </div>

                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                        Ventures & Projects
                      </h2>

                      <p className="text-gray-500 text-xs sm:text-sm">
                        Current business initiatives
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:gap-4">
                    {organization.ventures.map((venture, idx) => (
                      <div
                        key={idx}
                        className="bg-gradient-to-r from-slate-50 to-blue-50 border border-gray-100 rounded-2xl p-4 sm:p-5 hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-start gap-3 sm:gap-4">
                          
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-500 text-white flex items-center justify-center font-bold text-sm sm:text-base shrink-0">
                            {idx + 1}
                          </div>

                          <div className="min-w-0">
                            <h3 className="font-semibold text-base sm:text-lg text-gray-800 break-words">
                              {venture}
                            </h3>

                            <p className="text-xs sm:text-sm text-gray-500 mt-1">
                              Innovative venture initiative by the organization
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
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 p-4 sm:p-6">
              
              <div className="flex items-start sm:items-center gap-3 mb-5 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-purple-100 flex items-center justify-center text-xl sm:text-2xl shrink-0">
                  👨‍💼
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    CEO Profile
                  </h2>

                  <p className="text-gray-500 text-xs sm:text-sm">
                    Leadership & management
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center text-center">
                
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center text-2xl sm:text-3xl font-bold shadow-lg">
                  {organization.ceoName?.charAt(0)}
                </div>

                <h3 className="mt-4 sm:mt-5 text-xl sm:text-2xl font-bold text-gray-800 break-words">
                  {organization.ceoName}
                </h3>

                <p className="text-blue-500 font-medium mt-1 text-sm sm:text-base">
                  Chief Executive Officer
                </p>

                <div className="w-full h-px bg-gray-100 my-5 sm:my-6"></div>

                <p className="text-gray-600 leading-relaxed text-sm md:text-base break-words">
                  {organization.ceoBio}
                </p>
              </div>
            </div>

            {/* CHAT CARD */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-white shadow-xl">
              
              <div className="text-4xl sm:text-5xl mb-4">💬</div>

              <h2 className="text-xl sm:text-2xl font-bold">
                Start Collaboration
              </h2>

              <p className="text-green-100 mt-3 leading-relaxed text-sm sm:text-base">
                Connect directly with this organization and explore business
                opportunities together.
              </p>

              <Link
                to={`/dm/${organization.id}`}
                className="mt-5 sm:mt-6 inline-flex items-center justify-center gap-2 bg-white text-green-600 font-semibold px-5 py-3 rounded-2xl hover:bg-green-50 transition-all duration-300 w-full text-sm sm:text-base"
              >
                Start Chat
                <span className="text-lg">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}