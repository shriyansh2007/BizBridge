import { useState } from "react";
import { Link } from "react-router-dom";
export default function PostCard({ post }) {
  const [isLiked, setIsLiked]= useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [isInterested, setIsInterested]= useState(false);
  const [interested, setInterested] = useState(post.interested);
  const toggleLike=()=>{
    setIsLiked(!isLiked)
  }
  const handleLike=()=>{
    
    isLiked? (
      setLikes(likes-1)
      
    ):(
      setLikes(likes+1)
    )
    toggleLike();
  }
  const toggleInterested=()=>{
    setIsInterested(!isInterested)
  }
  const handleInterested=()=>{
    
    isInterested? (
      setInterested(interested-1)
      
    ):(
      setInterested(interested+1)
    )
    toggleInterested();
  }


  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <div className="font-bold">{post.authorName} ({post.authorType})</div>
      <p className="mt-2">{post.content}</p>
      {post.media && <img src={post.media} alt="media" className="mt-2 rounded max-h-60" />}
      <div className="flex gap-4 mt-3 text-sm">
        <button onClick={handleInterested}>Interested {interested}</button>
        <button onClick={handleLike}>Like {likes}</button>
        
        <Link
          to={`/dm/${post.authorId}`}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Reach Out
        </Link>
      </div>
    </div>
  );
}
