import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/blogs")
      .then((res) => {
        setBlogs(res.data.blogs || []); // ✅ FIX HERE
      })
      .catch((err) => {
        console.log("API ERROR:", err);
        setBlogs([]);
      });
  }, []);

  return (
  <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 py-20">

  {/* Background Glow Effects */}
  <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
  <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl"></div>
  <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

    <h1 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-14 tracking-tight">
      Latest Blogs
    </h1>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {blogs.map((blog) => (
        <div
          key={blog._id}
            className="group bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-2 transition-all duration-500"
        >
          {/* IMAGE */}
          {blog.image && (
            <div className="overflow-hidden ">
              <img
                src={`http://localhost:5000/${blog.image.replace("\\", "/")}`}
                alt={blog.title}
               className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            </div>
          )}

          {/* CONTENT */}
          <div className="p-7">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3 line-clamp-2 group-hover:text-indigo-400 transition-colors">
               {blog.title}
            </h2>

            <div
              className="text-slate-300 text-sm leading-7 line-clamp-3 mb-6"
              dangerouslySetInnerHTML={{
                __html: blog.content,
              }}
            />

            <Link
              to={`/blog/${blog._id}`}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-white px-5 py-3 rounded-xl font-medium hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
            >
              Read More
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </Link>
          </div>
        </div>
      ))}
    </div>

  </div>
</div>
  );
}