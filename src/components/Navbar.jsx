import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ onCreatePost }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow-md sticky top-0">
      <h1 className="text-lg font-bold">BizBridge</h1>
      <div className="flex gap-6">
        <Link to="/feed" className="hover:underline">Feed</Link>

        {onCreatePost && (
          <button
            onClick={onCreatePost}
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
          >
            + Post
          </button>
        )}

        <Link to={`/profile/${user?.id}`} className="hover:underline">Profile</Link>

        <button
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/login");
          }}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
