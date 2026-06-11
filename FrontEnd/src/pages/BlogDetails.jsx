import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function BlogDetails() {
  const { permalink } = useParams();

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (!permalink) return;

    axios
      .get(
        `https://growth-shark-6uib.onrender.com/api/blogs/permalink/${permalink}`
      )
      .then((res) => {
        setBlog(res.data.blog);
      })
      .catch((err) => {
        console.log(
          "API ERROR:",
          err.response?.data || err.message
        );
      });
  }, [permalink]);

  if (!blog) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 mt-40">
      {blog.image && (
        <img
          src={`https://growth-shark-6uib.onrender.com/${blog.image.replace(
            /\\/g,
            "/"
          )}`}
          alt={blog.title}
          className="w-full h-[400px] object-cover rounded-xl"
        />
      )}

      <h1 className="text-4xl font-bold mt-8 mb-6">
        {blog.title}
      </h1>

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{
          __html: blog.content,
        }}
      />
    </div>
  );
}