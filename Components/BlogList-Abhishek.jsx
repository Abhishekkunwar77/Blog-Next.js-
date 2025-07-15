import { blog_data } from "@/Assets/assets";
import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import axios from "axios";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading

  const fetchBlogs = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get("/api/blog");
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
    setLoading(false); // Stop loading
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((item) =>
    menu === "All" ? true : item.category === menu
  );

  return (
    <div>
      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-6 my-6 md:my-10 px-4 overflow-x-auto hover:cursor-pointer">
        {[
          "All",
          "Technology",
          "Startup",
          "Lifestyle",
          "Education",
          "Business",
          "Travel",
          "Entertainment",
        ].map((category) => (
          <button
            key={category}
            onClick={() => {
              setMenu(category);
              setLoading(true);
              setTimeout(() => setLoading(false), 500);
            }}
            className={`py-1 px-4 rounded-sm hover:cursor-pointer ${
              menu === category ? "bg-green-700 text-white" : ""
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Lazy Loading Spinner */}
      {loading ? (
        <div className="flex justify-center my-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-green-700"></div>
        </div>
      ) : (
        <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((item, index) => (
              <BlogItem
                key={index}
                image={item.image}
                title={item.title}
                description={item.description}
                category={item.category}
                id={item._id}
              />
            ))
          ) : (
            <div className="text-center text-gray-600 text-lg w-full">
              <marquee>
                <mark>
                  No blogs found in this category. But don’t worry, we’re
                  working on it!
                </mark>
              </marquee>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogList;
