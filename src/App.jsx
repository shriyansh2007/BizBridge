import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </Router>
  );
}
