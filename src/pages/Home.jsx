import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home flex  items-center justify-center min-h-screen bg-gray-100">
      <div className="left">
        <h1 className="text-6xl font-bold mb-6">From Trust To Growth</h1>
        <h1 className="text-4xl font-bold mb-6">Welcome to BizBridge</h1>
        <p className="mb-8 text-lg text-gray-700">
          Connect with organizations, explore opportunities, and grow your network.
        </p>
        <div className="signup-login">
          
            <div className="signup-home">
              <Link
                to="/signup"
                className="signup bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
              >
                Sign Up
              </Link>

            </div>
            <div className="login-home">
              <Link
                to="/login"
                className="login text-white px-6 py-3 rounded "
              >
                Login
              </Link>

            </div>
          



        </div>


      </div>
      <div className="right">
        <img src="src\media\images\home-top-right.webp" alt="right-image" style={{ width: "520px" }} />
      </div>
    </div>
  );
}
