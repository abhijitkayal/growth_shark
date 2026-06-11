import { useState } from "react";
import ReactQuill from "react-quill";
import axios from "axios";
import "react-quill/dist/quill.snow.css";

export default function AddBlog() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    permalink: "",
    schema: "",
  });

  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    // ✅ append file FIRST (important in some cases)
    if (image) {
      data.append("image", image);
    }

    // ✅ append rest fields
    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });

    try {
      await axios.post("http://localhost:5000/api/blogs/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Blog Added");
    } catch (err) {
      console.log(err.response?.data || err.message);
      console.log("he");
    }
  };

  return (
    <div className="min-h-screen  py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Add Blog
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            placeholder="Title"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ouline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input
            type="file"
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm">
            <ReactQuill
              value={form.content}
              onChange={(value) => setForm({ ...form, content: value })}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              placeholder="Meta Title"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ouline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
            />
            <input
              placeholder="Keywords"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ouline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setForm({ ...form, keywords: e.target.value })}
            />
          </div>
          <textarea
            placeholder="Meta Description"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ouline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setForm({
                ...form,
                metaDescription: e.target.value,
              })
            }
          />

          <input
            placeholder="Permalink"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ouline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setForm({ ...form, permalink: e.target.value })}
          />

          <textarea
            placeholder="Schema JSON"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ouline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setForm({ ...form, schema: e.target.value })}
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
          >
            Publish Blog
          </button>
        </form>
      </div>
    </div>
  );
}
