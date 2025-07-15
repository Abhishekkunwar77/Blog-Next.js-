import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import axios from "axios";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await axios.get("/api/blog");
    setBlogs(response.data.blogs);
    console.log(response.data.blogs);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div>
      <div className="flex justify-center gap-6 my-10">
        <button
          onClick={() => setMenu("All")}
          className={
            menu === "All"
              ? "bg-green-700 text-white py-1 px-4 rounded-sm hover:cursor-pointer"
              : "hover:cursor-pointer"
          }
        >
          All
        </button>
        <button
          className={
            menu === "Technology"
              ? "bg-green-700 text-white py-1 px-4 rounded-sm hover:cursor-pointer"
              : "hover:cursor-pointer"
          }
          onClick={() => setMenu("Technology")}
        >
          Technology
        </button>
        <button
          className={
            menu === "Startup"
              ? "bg-green-700 text-white py-1 px-4 rounded-sm hover:cursor-pointer"
              : "hover:cursor-pointer"
          }
          onClick={() => setMenu("Startup")}
        >
          Startup
        </button>
        <button
          className={
            menu === "Lifestyle"
              ? "bg-green-700 text-white py-1 px-4 rounded-sm hover:cursor-pointer"
              : "hover:cursor-pointer"
          }
          onClick={() => setMenu("Lifestyle")}
        >
          Lifestyle
        </button>
        <button
          className={
            menu === "Education"
              ? "bg-green-700 text-white py-1 px-4 rounded-sm hover:cursor-pointer"
              : "hover:cursor-pointer"
          }
          onClick={() => setMenu("Education")}
        >
          Education
        </button>
        <button
          className={
            menu === "Travel"
              ? "bg-green-700 text-white py-1 px-4 rounded-sm hover:cursor-pointer"
              : "hover:cursor-pointer"
          }
          onClick={() => setMenu("Travel")}
        >
          Travel
        </button>
        <button
          className={
            menu === "Business"
              ? "bg-green-700 text-white py-1 px-4 rounded-sm hover:cursor-pointer"
              : "hover:cursor-pointer"
          }
          onClick={() => setMenu("Business")}
        >
          Business
        </button>
        <button
          className={
            menu === "Entertainment"
              ? "bg-green-700 text-white py-1 px-4 rounded-sm hover:cursor-pointer"
              : "hover:cursor-pointer"
          }
          onClick={() => setMenu("Entertainment")}
        >
          Entertainment
        </button>
      </div>
      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
        {blogs
          .filter((item) => (menu === "All" ? true : item.category === menu))
          .map((item, index) => {
            return (
              <BlogItem
                key={index}
                image={item.image}
                title={truncateText(item.title, 50)}
                description={truncateText(item.description, 100)}
                category={item.category}
                id={item._id}
                readMoreLink={`/blog/${item._id}`}
              />
            );
          })}
      </div>
    </div>
  );
};

export default BlogList;
