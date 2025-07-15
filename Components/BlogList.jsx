import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import axios from "axios";

// Skeleton component for loading state
const BlogSkeleton = () => (
  <div className="animate-pulse w-[300px] h-[400px] bg-gray-200 rounded-lg p-4">
    <div className="h-40 bg-gray-300 rounded mb-4"></div>
    <div className="h-6 bg-gray-300 rounded mb-2"></div>
    <div className="h-4 bg-gray-300 rounded mb-2"></div>
    <div className="h-4 bg-gray-300 rounded mb-2"></div>
    <div className="h-4 bg-gray-300 rounded"></div>
  </div>
);

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const blogsPerPage = 8;

  const fetchBlogs = async (pageNum) => {
    try {
      setIsLoading(true);
      // Simulate a delay of 2 seconds to demonstrate lazy loading
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axios.get(
        `/api/blog?page=${pageNum}&limit=${blogsPerPage}`
      );
      setBlogs((prevBlogs) => [...prevBlogs, ...response.data.blogs]);
      console.log(response.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setBlogs([]); // Reset blogs when menu changes
    setPage(1); // Reset to first page
    fetchBlogs(1);
  }, [menu]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchBlogs(nextPage);
  };

  // Function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  // Filter blogs based on the selected category
  const filteredBlogs = blogs.filter((item) =>
    menu === "All" ? true : item.category === menu
  );

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
        {isLoading && blogs.length === 0
          ? // Display skeletons for initial load
            Array(blogsPerPage)
              .fill()
              .map((_, index) => <BlogSkeleton key={index} />)
          : filteredBlogs.map((item, index) => (
              <BlogItem
                key={index}
                image={item.image}
                title={truncateText(item.title, 50)}
                description={truncateText(item.description, 100)}
                category={item.category}
                id={item._id}
                readMoreLink={`/blog/${item._id}`}
              />
            ))}
      </div>
      {isLoading && blogs.length > 0 ? (
        // Display skeletons for loading more blogs
        <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
          {Array(blogsPerPage)
            .fill()
            .map((_, index) => (
              <BlogSkeleton key={`load-more-${index}`} />
            ))}
        </div>
      ) : (
        filteredBlogs.length > 0 && (
          <div className="flex justify-center mb-16">
            <button
              onClick={handleLoadMore}
              className="bg-green-700 text-white py-2 px-6 rounded-sm hover:bg-green-800 transition"
            >
              Load More
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default BlogList;
