import { assets, blog_data } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogItem = ({ title, description, category, image, id }) => {
  const truncatedTitle = title.length > 70 ? title.slice(0, 70) + "..." : title;

  return (
    <div className="max-w-[330px] sm:max-w-[300px] bg-white border border-green hover:shadow-[-7px_7px_0px_#16a34a]">
      <Link href={`/blogs/${id}`}>
        <Image
          src={image}
          alt=""
          width={400}
          height={400}
          className="border-b border-green object-cover w-[400px] h-[180px]"
        />
      </Link>
      <p className="ml-5 mt-5 px-1 inline-block bg-green-500 text-white text-small">
        {category}
      </p>
      <div className="p-5">
        <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">
          {truncatedTitle}
        </h5>
        <p
          className="mb-3 text-sm tracking-tight text-gray-700"
          dangerouslySetInnerHTML={{ __html: description.slice(0, 120) }}
        ></p>
        <Link
          href={`/blogs/${id}`}
          className="inline-flex items-center py-2 font-semibold text-center "
        >
          Read more
          <Image src={assets.arrow} alt="" width={12} className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;
