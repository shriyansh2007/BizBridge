import { Link } from "react-router-dom";
import "./Home.css";
import homeImage from "../media/images/home-top-right.webp";
export default function Home() {
  return (
    <div className="home-container">
      
      {/* BACKGROUND BLURS */}
      <div className="bg-blur blur-1"></div>
      <div className="bg-blur blur-2"></div>

      {/* LEFT SECTION */}
      <div className="home-left">
        
        {/* BADGE */}
        <div className="top-badge">
          🚀 Empowering Startups & Enterprises
        </div>

        {/* MAIN CONTENT */}
        <h1 className="main-heading">
          From Trust
          <br />
          To Growth
        </h1>

        <h2 className="sub-heading">
          Welcome to <span>BizBridge</span>
        </h2>

        <p className="description">
          Connect with organizations, discover opportunities,
          collaborate with innovators, and build meaningful
          business relationships in one powerful ecosystem.
        </p>

        {/* STATS */}
        <div className="stats-container">
          
          <div className="stat-card">
            <h3>500+</h3>
            <p>Organizations</p>
          </div>

          <div className="stat-card">
            <h3>1K+</h3>
            <p>Connections</p>
          </div>

          <div className="stat-card">
            <h3>24/7</h3>
            <p>Networking</p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="btn-group">
          
          <Link to="/signup" className="signup-btn">
            ✨ Get Started
          </Link>

          <Link to="/login" className="login-btn">
            🔐 Login
          </Link>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="home-right">
        
        {/* FLOATING CARD 1 */}
        <div className="floating-card card-1">
          🌍 Global Networking
        </div>

        {/* IMAGE */}
        <div className="image-wrapper">
          <img
            src={homeImage}
            alt="BizBridge illustration"
            className="home-image"
          />
        </div>

        {/* FLOATING CARD 2 */}
        <div className="floating-card card-2">
          🤝 Collaboration Hub
        </div>
      </div>
    </div>
  );
}