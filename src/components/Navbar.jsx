import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";
import NewPostModal from "./NewPostModel";
export default function Navbar({ onCreatePost }) {
  const [showModal, setShowModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const handlePostSubmit = (postData) => {
    onCreatePost(postData); // send data to Feed.jsx
    setShowModal(false);
  };

  return (
    <>
      <nav id="navbar" className="navbar bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow-md sticky top-0">
        <h1 id="logo" className=".logo">BizBridge</h1>
        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
        <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <Link to="/feed" className=" hover:underline">Feed</Link>
          <Link to="/explore" className="hover:underline">Explore</Link>

          {user && (
            <button
              onClick={() => setShowModal(true)}
              className="post-btn bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
            >
              + Post
            </button>
          )}

          <Link to={`/profile/${user?.id}`} className="hover:underline">Profile</Link>

          <button
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/home");
            }}
            className="logout-btn bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout*
          </button>
        </div>
      </nav>
      {showModal && (
        <NewPostModal
          onClose={() => setShowModal(false)}
          onSubmit={handlePostSubmit}
        />
      )}

    </>

  );
}
