import { assets } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogItem = ({ title, description, category, image, id }) => {
  // Function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="max-w-[330px] sm:max-w-[300px] bg-white border border-green-500 hover:shadow-[-7px_7px_0px_#16a34a] relative">
      <Link href={`/blogs/${id}`}>
        <Image
          src={image}
          alt=""
          width={400}
          height={192}
          className="w-full h-45 object-cover border-b border-green-500"
        />
      </Link>
      <p className="ml-5 mt-5 px-1 inline-block bg-green-500 text-white text-sm">
        {category}
      </p>
      <div className="p-6">
        <h5 className="mb-3 text-lg font-medium tracking-tight text-gray-900">
          {truncateText(title, 50)}
        </h5>
        <p
          className="mb-6 text-sm tracking-tight text-gray-700"
          dangerouslySetInnerHTML={{ __html: truncateText(description,90) }}
        ></p>
        <Link
          href={`/blogs/${id}`}
          className="absolute flex items-center justify-center  bottom-1 left-5 inline-flex items-center py-2 font-semibold text-center text-green-700 hover:text-green-900"
        >
          Read more
          <Image src={assets.arrow} alt="" width={12} className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;
