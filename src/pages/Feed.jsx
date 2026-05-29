import { useState, useEffect } from "react";
import API from "../services/api";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Feed() {
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
    API.get("/posts").then((res) => setPosts(res.data));
  }, []);

  const handleNewPost = async (data) => {
    const newPost = {
      authorId: user.id,
      authorName: user.name,
      authorType: user.organizationType,
      content: data.description,
      imageUrl: data.imageUrl || "",
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await API.post("/posts", newPost);
      setPosts([res.data, ...posts]);
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <Navbar onCreatePost={handleNewPost} />

        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* LEFT SIDEBAR */}
            <div className="hidden lg:block">
              <div className="sticky top-24 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {user?.name?.charAt(0)}
                  </div>

                  <h2 className="mt-4 text-lg font-semibold text-gray-800">
                    {user?.name}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    {user?.organizationType}
                  </p>

                  <div className="w-full mt-5 border-t pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Posts</span>
                      <span className="font-semibold text-gray-800">
                        {posts.length}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm mt-3">
                      <span className="text-gray-500">Network</span>
                      <span className="font-semibold text-gray-800">
                        Growing 🚀
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* MAIN FEED */}
            <div className="lg:col-span-2">
              
              {/* Feed Header */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                      BizBridge Feed
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                      Discover opportunities, partnerships, and updates
                    </p>
                  </div>

                  <div className="hidden sm:flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Live Feed
                  </div>
                </div>
              </div>

              {/* Create Post Quick Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                    {user?.name?.charAt(0)}
                  </div>

                  <button
                    onClick={() => setShowModal(true)}
                    className="flex-1 text-left bg-gray-100 hover:bg-gray-200 transition-all duration-200 rounded-full px-5 py-3 text-gray-500"
                  >
                    Share something with your network...
                  </button>
                </div>
              </div>

              {/* POSTS */}
              <div className="space-y-6">
                {posts.length > 0 ? (
                  posts.map((p) => <PostCard key={p.id} post={p} />)
                ) : (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
                    <div className="text-5xl mb-4">📢</div>

                    <h3 className="text-xl font-semibold text-gray-800">
                      No posts yet
                    </h3>

                    <p className="text-gray-500 mt-2">
                      Be the first one to share something with the community.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="hidden lg:block">
              <div className="sticky top-24 space-y-5">
                
                {/* Trending */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Trending Topics
                  </h3>

                  <div className="space-y-3">
                    {[
                      "Startup Funding",
                      "AI Solutions",
                      "MSME Growth",
                      "Business Networking",
                    ].map((topic, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between bg-gray-50 hover:bg-blue-50 transition-all duration-200 rounded-xl px-4 py-3 cursor-pointer"
                      >
                        <span className="text-sm font-medium text-gray-700">
                          #{topic}
                        </span>

                        <span className="text-xs text-blue-500 font-semibold">
                          Trending
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tips Card */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white shadow-lg">
                  <h3 className="text-lg font-semibold">
                    Grow Your Network 🚀
                  </h3>

                  <p className="text-sm text-blue-100 mt-2 leading-relaxed">
                    Engage with posts, connect with businesses, and share
                    valuable updates to increase your visibility.
                  </p>

                  <button className="mt-4 bg-white text-blue-600 font-semibold px-4 py-2 rounded-xl hover:bg-blue-50 transition-all duration-200">
                    Explore More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}