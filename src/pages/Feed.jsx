import { useState, useEffect } from "react";
import API from "../services/api";
import PostCard from "../components/PostCard";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";


export default function Feed() {
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
    API.get("/posts").then(res => setPosts(res.data));
  }, []);

  const handleNewPost = async (data) => {
  const newPost = {
    authorId: user.id,
    authorName: user.name,
    authorType: user.organizationType,
    content: data.description,
    imageUrl: data.imageUrl || "", 
    createdAt: new Date().toISOString(),
  };

  try {
    const res = await API.post("/posts", newPost);
    setPosts([res.data, ...posts]);
  } catch (err) {
    console.error("Error creating post:", err);
  }
};


  // const createPost = async () => {
  //   const content = prompt("Enter post content:");
  //   if (content) {
  //     const newPost = {
  //       authorId: user.id,
  //       authorName: user.name,
  //       authorType: user.organizationType,
  //       content,
  //       media: "",
  //       likes: 0,
  //       interested: 0
  //     };
  //     await API.post("/posts", newPost);
  //     setPosts([...posts, newPost]);
  //   }
  // };

  return (
    <>
    <Navbar onCreatePost={handleNewPost} />
    <div className="p-4 max-w-xl mx-auto xyz">
      
      {/* <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">BizBridge Feed</h2>
        <Link to={`/profile/${user?.id}`} className="text-blue-500">Profile</Link>
      </div>
      <button onClick={createPost} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">+ Post</button> */}
      {posts.map(p => <PostCard key={p.id} post={p} />)}
    </div>

    </>
    
  );
}
// p-4 max-w-xl mx-auto xyz
