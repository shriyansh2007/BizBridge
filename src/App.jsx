import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import DM from "./pages/DM";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dm/:orgId" element={<DM />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </Router>
  );
}
