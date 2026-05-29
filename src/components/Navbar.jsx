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
    onCreatePost(postData);
    setShowModal(false);
  };

  return (
    <>
      <nav id="navbar" className="navbar">
        
        {/* LOGO */}
        <div
          className="logo-section"
          onClick={() => navigate("/feed")}
        >
          {/* <div className="logo-icon"><img src="BizBridge\src\media\images\Logo-removebg-preview.png" alt="" /></div> */}

          <div>
            <h1 id="logo" className="logo">
              BizBridge
            </h1>

            <p className="logo-subtitle">
              Connect & Collaborate
            </p>
          </div>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className={`menu-toggle ${
            isMenuOpen ? "active" : ""
          }`}
          onClick={() =>
            setIsMenuOpen(!isMenuOpen)
          }
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* NAV LINKS */}
        <div
          className={`nav-links ${
            isMenuOpen ? "open" : ""
          }`}
        >
          <Link
            to="/feed"
            onClick={() => setIsMenuOpen(false)}
          >
            📰 Feed
          </Link>

          <Link
            to="/explore"
            onClick={() => setIsMenuOpen(false)}
          >
            🌍 Explore
          </Link>

          {user && (
            <button
              onClick={() => {
                setShowModal(true);
                setIsMenuOpen(false);
              }}
              className="post-btn"
            >
              ✨ Create Post
            </button>
          )}

          <Link
            to={`/profile/${user?.id}`}
            onClick={() => setIsMenuOpen(false)}
          >
            👤 Profile
          </Link>

          <button
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/home");
            }}
            className="logout-btn"
          >
            🚪 Logout
          </button>
        </div>
      </nav>

      {/* OVERLAY */}
      {isMenuOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* MODAL */}
      {showModal && (
        <NewPostModal
          onClose={() => setShowModal(false)}
          onSubmit={handlePostSubmit}
        />
      )}
    </>
  );
}