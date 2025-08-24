import { useState } from "react";
import { Link } from "react-router-dom";
export default function PostCard({ post }) {
  const [likes, setLikes] = useState(post.likes);
  const [interested, setInterested] = useState(post.interested);

  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <div className="font-bold">{post.authorName} ({post.authorType})</div>
      <p className="mt-2">{post.content}</p>
      {post.media && <img src={post.media} alt="media" className="mt-2 rounded max-h-60" />}
      <div className="flex gap-4 mt-3 text-sm">
        <button onClick={() => setInterested(interested + 1)}>Interested {interested}</button>
        <button onClick={() => setLikes(likes + 1)}>Like {likes}</button>
        
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
