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
      data.append(
        "upload_preset",
        "your_unsigned_preset"
      );

      data.append(
        "cloud_name",
        "your_cloud_name"
      );

      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
          data
        );

        imageUrl = res.data.secure_url;
      } catch (err) {
        console.error("Image upload failed", err);
      }

      setUploading(false);
    }

    onSubmit({ imageUrl, description });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 py-6 overflow-y-auto">
      
      {/* MODAL */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 md:p-7 text-white relative overflow-hidden">
          
          {/* DECOR */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

          <div className="relative z-10 flex items-center justify-between gap-4">
            
            <div>
              <div className="flex items-center gap-3">
                
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl border border-white/20">
                  ✨
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    Create New Post
                  </h2>

                  <p className="text-blue-100 text-sm mt-1">
                    Share your latest project or idea
                  </p>
                </div>
              </div>
            </div>

            {/* CLOSE */}
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-xl transition-all duration-300"
            >
              ✕
            </button>
          </div>
        </div>

        {/* BODY */}
        <form
          onSubmit={handleSubmit}
          className="p-5 md:p-7 space-y-6"
        >
          
          {/* IMAGE UPLOAD */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Upload Project Image
            </label>

            <div className="border-2 border-dashed border-blue-200 bg-blue-50/50 hover:bg-blue-50 transition-all duration-300 rounded-3xl p-6 text-center relative">
              
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFile(e.target.files[0])
                }
                className="absolute inset-0 opacity-0 cursor-pointer"
                required
              />

              <div className="flex flex-col items-center justify-center">
                
                <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center text-4xl mb-4">
                  📸
                </div>

                <h3 className="font-bold text-gray-800 text-lg">
                  Upload Image
                </h3>

                <p className="text-gray-500 text-sm mt-2">
                  Drag & drop or click to browse
                </p>

                {file && (
                  <div className="mt-4 bg-green-100 text-green-700 px-4 py-2 rounded-2xl text-sm font-medium">
                    ✅ {file.name}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Project Description
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="w-full border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-3xl px-5 py-4 outline-none transition-all duration-300 resize-none min-h-[140px]"
              placeholder="Describe your project, idea, or collaboration opportunity..."
              required
            ></textarea>

            <div className="flex justify-between items-center mt-2">
              
              <p className="text-xs text-gray-400">
                Make your post engaging and informative
              </p>

              <span className="text-xs text-gray-400">
                {description.length} characters
              </span>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end pt-2">
            
            {/* CANCEL */}
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-all duration-300"
            >
              Cancel
            </button>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={uploading}
              className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] text-white font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-70"
            >
              {uploading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Uploading...
                </span>
              ) : (
                "🚀 Publish Post"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}