import { assets } from "@/Assets/assets";
import Image from "next/image";
import React, { useState } from "react";
import { createPortal } from "react-dom";

const BlogTableItem = ({
  authorImg,
  title,
  author,
  date,
  deleteBlog,
  mongoId,
}) => {
  const BlogDate = new Date(date);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleDelete = () => {
    if (selectedBlog) {
      deleteBlog(selectedBlog);
      setShowConfirm(false);
      setSelectedBlog(null);
    }
  };

  return (
    <>
      <tr className="bg-white border-b">
        <th
          scope="row"
          className="items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          <Image
            src="/author_img.png"
            alt="Profile Icon"
            width={50}
            height={50}
          />

          <p>{author ? author : "No Author"}</p>
        </th>
        <td className="px-6 py-4">{title ? title : "No title"}</td>
        <td className="px-6 py-4">{BlogDate.toDateString()}</td>
        <td
          onClick={() => {
            setSelectedBlog(mongoId);
            setShowConfirm(true);
          }}
          className="px-6 py-4 cursor-pointer text-red-500 font-bold"
        >
          X
        </td>
      </tr>

      {/* Render Modal Outside the Table using a Portal */}
      {showConfirm &&
        createPortal(
          <ConfirmationModal
            onClose={() => setShowConfirm(false)}
            onConfirm={handleDelete}
          />,
          document.body
        )}
    </>
  );
};

// Confirmation Modal Component (Outside the Table)
const ConfirmationModal = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50 border-2 border-green-500">
      <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
      <p>Are you sure you want to delete this blog?</p>
      <div className="flex justify-end mt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};


export default BlogTableItem;
