import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PortfolioDetails() {
  const { permalink } = useParams();

  const [page, setPage] = useState(null);

  useEffect(() => {
    fetchPage();
  }, [permalink]);

  const fetchPage = async () => {
    try {
      const res = await axios.get(
        `https://growth-shark-6uib.onrender.com/api/portfolio/${permalink}`
      );

      // The backend returns the portfolio document directly (not wrapped in an object).
      // Previously we attempted to read `res.data.page`, which resulted in `undefined`
      // and caused the component to stay in the loading state. Use the response data
      // itself as the page object.
      console.log("API Response:", res.data); // Log the entire response data for debugging
      setPage(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-slate-950">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen  text-black py-20">
      <div className="max-w-5xl mx-auto px-4 mt-30">

        {page.featuredImage && (
          <img
            src={page.featuredImage}
            alt={page.title}
            className="w-full h-[500px] object-cover rounded-2xl mb-10"
          />
        )}

        <h1 className="text-5xl font-bold mb-6">
          {page.title}
        </h1>

        <p className="text-slate-300 text-lg mb-10">
          {page.description}
        </p>

        {page.sections?.map((section, index) => (
          <div
            key={index}
            className="mb-16"
          >
            {section.image && (
              <img
                src={section.image}
                alt={section.title}
                className="w-full rounded-xl mb-6"
              />
            )}

            <h2 className="text-3xl font-bold mb-4">
              {section.title}
            </h2>

            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{
                __html: section.description,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}