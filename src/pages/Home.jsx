import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      {/* Left Section */}
      <div className="home-left">
        <h1 className="main-heading">From Trust To Growth</h1>
        <h2 className="sub-heading">Welcome to BizBridge</h2>
        <p className="description">
          Connect with organizations, explore opportunities, and grow your network.
        </p>

        <div className="btn-group">
          <Link to="/signup" className="signup-btn">
            Sign Up
          </Link>
          <Link to="/login" className="login-btn">
            Login
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="home-right">
        <img
          src="src/media/images/home-top-right.webp"
          alt="BizBridge illustration"
          className="home-image"
        />
      </div>
    </div>
  );
}

