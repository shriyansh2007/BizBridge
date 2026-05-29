import { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

export default function PostCard({ post }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [isInterested, setIsInterested] = useState(false);
  const [interested, setInterested] = useState(post.interested);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleLike = () => {
    isLiked ? setLikes(likes - 1) : setLikes(likes + 1);

    toggleLike();
  };

  const toggleInterested = () => {
    setIsInterested(!isInterested);
  };

  const handleInterested = () => {
    isInterested
      ? setInterested(interested - 1)
      : setInterested(interested + 1);

    toggleInterested();
  };

  return (
    <div className="bg-white border border-gray-100 shadow-sm hover:shadow-xl rounded-3xl p-5 md:p-6 mb-6 transition-all duration-300 overflow-hidden">
      
      {/* TOP SECTION */}
      <div className="flex items-start gap-4">
        
        {/* AVATAR */}
        <div className="shrink-0">
          <Avatar name={post.authorName} />
        </div>

        {/* USER INFO */}
        <div className="flex-1 min-w-0">
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            
            <div>
              <h3 className="text-lg font-bold text-gray-800 break-words">
                {post.authorName}
              </h3>

              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
                  {post.authorType}
                </span>

                <span className="text-xs text-gray-400">
                  • Just now
                </span>
              </div>
            </div>

            {/* VERIFIED */}
            <div className="flex items-center gap-1 bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full w-fit">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Verified
            </div>
          </div>

          {/* CONTENT */}
          <p className="mt-4 text-gray-700 leading-relaxed text-sm md:text-base break-words">
            {post.content}
          </p>

          {/* IMAGE */}
          {post.media && (
            <div className="mt-5 overflow-hidden rounded-2xl border border-gray-100">
              <img
                src={post.media}
                alt="media"
                className="w-full max-h-[450px] object-cover hover:scale-[1.02] transition-all duration-500"
              />
            </div>
          )}

          {/* ACTIONS */}
          <div className="mt-5 pt-4 border-t border-gray-100">
            
            <div className="flex flex-wrap items-center gap-3">
              
              {/* INTERESTED BUTTON */}
              <button
                onClick={handleInterested}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-300 ${
                  isInterested
                    ? "bg-purple-100 text-purple-600"
                    : "bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-purple-600"
                }`}
              >
                <span className="text-base">🚀</span>
                Interested
                <span className="font-bold">
                  {interested || 0}
                </span>
              </button>

              {/* LIKE BUTTON */}
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-300 ${
                  isLiked
                    ? "bg-red-100 text-red-600"
                    : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600"
                }`}
              >
                <span className="text-base">
                  {isLiked ? "❤️" : "🤍"}
                </span>

                Like

                <span className="font-bold">
                  {likes || 0}
                </span>
              </button>

              {/* REACH OUT BUTTON */}
              <Link
                to={`/dm/${post.authorId}`}
                className="ml-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-2xl text-sm font-semibold shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                Reach Out →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}