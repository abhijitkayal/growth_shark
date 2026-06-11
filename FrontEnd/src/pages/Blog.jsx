import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://growth-shark-6uib.onrender.com/api/blogs")
      .then((res) => {
        setBlogs(res.data.blogs || []); // ✅ FIX HERE
      })
      .catch((err) => {
        console.log("API ERROR:", err);
        setBlogs([]);
      });
  }, []);

  return (
  <div className="min-h-screen relative overflow-hidden bg-gradient-to-r from-black via-[#0b223f] to-[#06263f] py-20">

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
            className=" bg-white shadow flex flex-col rounded-2xl p-4"
        >
          {/* IMAGE */}
          {blog.image && (
            <div className="overflow-hidden rounded-xl ">
              <img
                src={`https://growth-shark-6uib.onrender.com/${blog.image.replace("\\", "/")}`}
                alt={blog.title}
               className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* <div className="absolute inset-0 "></div> */}
            </div>
          )}

          {/* CONTENT */}
          <div className="p-2">
            <h2 className="text-xl md:text-2xl font-bold text-black mb-3 line-clamp-2 group-hover:text-indigo-400 transition-colors">
               {blog.title}
            </h2>

            <div
              className="text-black text-sm leading-7 line-clamp-3 mb-6"
              dangerouslySetInnerHTML={{
                __html: blog.content,
              }}
            />

            <button className="underline cursor-pointer text-black  rounded-lg " onClick={() => navigate(`/blog/${blog.permalink}`)}>
  Read More
</button>
          </div>
        </div>
      ))}
    </div>

  </div>
</div>
  );
}