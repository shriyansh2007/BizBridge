import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to BizBridge</h1>
      <p className="mb-8 text-lg text-gray-700">
        Connect with organizations, explore opportunities, and grow your network.
      </p>
      <div className="flex gap-6">
        <Link
          to="/signup"
          className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
