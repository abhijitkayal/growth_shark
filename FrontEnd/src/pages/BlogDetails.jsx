import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function BlogDetails() {
  const { id } = useParams(); // ✅ now using ID
  const [blog, setBlog] = useState(null);
  console.log("hi");
  

 useEffect(() => {
  console.log("ID:", id); // 👈 Add this first line
  
  if (!id) return;        // 👈 Guard against undefined

  axios
    .get(`http://localhost:5000/api/blogs/${id}`)
    .then((res) => {
      setBlog(res.data.blog);
    })
    .catch((err) => {
      console.log("API ERROR:", err.response?.data || err.message); // 👈 Better error log
    });
}, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">

      {blog.image && (
        <img
          src={`http://localhost:5000/${blog.image.replace("\\", "/")}`}
          alt={blog.title}
          className="w-full h-64 object-cover rounded"
        />
      )}

      <h1 className="text-3xl font-bold mt-4">
        {blog.title}
      </h1>

      <div
        className="mt-4 prose"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
}