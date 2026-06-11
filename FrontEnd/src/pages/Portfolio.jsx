import { useEffect, useState } from "react";
import axios from "axios";
  import { Link } from "react-router-dom";
export default function Pages() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/portfolio"
      );

      setPages(res.data.pages || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-[#0b223f] to-[#06263f] py-20 px-4 ">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-center text-white mb-12">
          Portfolio
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-40">
       

{pages.map((page) => (
  <Link
    key={page._id}
    to={`/portfolio/${page.permalink}`}
    className="group relative overflow-hidden rounded-3xl h-[320px] block"
  >
    <img
      src={page.featuredImage}
      alt={page.title}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />

    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition-all duration-500" />

    {/* Content */}
    <div className="absolute inset-0 flex flex-col justify-end p-6">
      <div className="translate-y-12 group-hover:translate-y-0 transition-all duration-500">
        
        <p className="text-indigo-400 text-sm uppercase tracking-widest mb-2">
          {page.permalink}
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white">
          {page.title}
        </h2>

      </div>
    </div>
  </Link>
))}
        </div>

      </div>
    </div>
  );
}