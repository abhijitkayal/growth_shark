import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Portfolio1 from "../assets/Portfolio1.jpg";
import Portfolio2 from "../assets/Portfolio2.jpg";
import Portfolio3 from "../assets/Portfolio3.jpg";
import Portfolio4 from "../assets/Portfolio4.jpg";
import Portfolio5 from "../assets/Portfolio5.jpg";
import { useState } from "react";

import axios from "axios";

export default function Portfolio() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    title: "",
    urllive: "",
    category: "Web Development",
    description: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
   const handleSubmit = async(e) => {
    e.preventDefault();
   try {
    const resonse= await axios.post("http://localhost:5000/api/portfolio",form)
   
     console.log("Success:", resonse.data);
   } catch (error) {
    console.log("Error:", error.response?.data || error.message);
   }
  };

  return (

 <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black py-30 px-4">
      <div className="max-w-4xl mx-auto">

    
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Add Portfolio Project
          </h1>
          <p className="text-slate-400">
            Showcase your best work and grow your portfolio.
          </p>
        </div>

     
        <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl">

        
          <form onSubmit={handleSubmit} className="space-y-6">

          
            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <label htmlFor="fullname" className="block text-slate-300 mb-2 font-medium">
                  Full Name
                </label>
                <input
                  name="fullname"
                  value={form.fullname}
                  onChange={handleChange}
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-slate-300 mb-2 font-medium">
                  Email Address
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition"
                />
              </div>

            </div>

          
            <div>
              <label htmlFor="title" className="block text-slate-300 mb-2 font-medium">
                Project Title
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                type="text"
                placeholder="E-Commerce Website"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition"
              />
            </div>

         
            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <label className="block text-slate-300 mb-2 font-medium">
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:border-indigo-500 outline-none"
                >
                  <option>Web Development</option>
                  <option>UI/UX Design</option>
                  <option>Mobile App</option>
                  <option>Digital Marketing</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-2 font-medium">
                  Live URL
                </label>
                <input
                  name="urllive"
                  value={form.urllive}
                  onChange={handleChange}
                  type="url"
                  placeholder="https://yourproject.com"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition"
                />
              </div>

            </div>

          
            <div>
              <label className="block text-slate-300 mb-2 font-medium">
                Project Thumbnail
              </label>

              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-700 rounded-2xl cursor-pointer bg-slate-800/50 hover:border-indigo-500 transition">
                <div className="text-center">
                  <p className="text-slate-300 font-medium">
                    Click to upload image
                  </p>
                  <p className="text-slate-500 text-sm mt-1">
                    PNG, JPG, JPEG
                  </p>
                </div>

                <input type="file" className="hidden" />
              </label>
            </div>

         
            <div>
              <label className="block text-slate-300 mb-2 font-medium">
                Project Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="6"
                placeholder="Describe your project..."
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition resize-none"
              />
            </div>

        
            <div className="flex flex-col sm:flex-row gap-4 pt-2">

              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold hover:scale-[1.02] transition"
              >
                Submit Portfolio
              </button>

              <button
                type="reset"
                onClick={() =>
                  setForm({
                    fullname: "",
                    email: "",
                    title: "",
                    urllive: "",
                    category: "Web Development",
                    description: "",
                  })
                }
                className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition"
              >
                Reset Form
              </button>

            </div>

          </form>
          {/* FORM END */}

        </div>
      </div>
    </div>
  );
}
