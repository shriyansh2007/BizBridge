import { useState } from "react";
import axios from "axios";

export default function NewPostModal({ onClose, onSubmit }) {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = "";

    if (file) {
      setUploading(true);
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "your_unsigned_preset"); // Cloudinary unsigned preset
      data.append("cloud_name", "your_cloud_name");

      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
          data
        );
        imageUrl = res.data.secure_url; // ✅ real permanent URL
      } catch (err) {
        console.error("Image upload failed", err);
      }
      setUploading(false);
    }

    onSubmit({ imageUrl, description });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-4">Create New Post</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border px-3 py-2 rounded mb-4"
            required
          />

          <label className="block mb-2 font-medium">Project Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-3 py-2 rounded mb-4"
            placeholder="Enter description"
            required
          ></textarea>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {uploading ? "Uploading..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

