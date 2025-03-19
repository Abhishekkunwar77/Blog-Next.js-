import React, { useState } from "react";
import { createPortal } from "react-dom";

const SubsTableItem = ({ email, deleteEmail, mongoId, date }) => {
  const emailDate = new Date(date);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const handleDelete = () => {
    if (selectedEmail) {
      deleteEmail(selectedEmail); // ✅ Delete email
      setShowConfirm(false);
      setSelectedEmail(null);
    }
  };

  return (
    <>
      <tr className="bg-white border-b text-left ">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          {email ? email : "No Email"}
        </th>
        <td className="px-6 hidden sm:block py-4">
          {emailDate.toDateString()}
        </td>
        <td
          onClick={() => {
            setSelectedEmail(mongoId);
            setShowConfirm(true);
          }}
          className="px-6 py-4 cursor-pointer text-red-500 font-bold"
        >
          X
        </td>
      </tr>

      {/* Render Modal Outside Table using Portal */}
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

// ✅ Reusable Confirmation Modal Component
const ConfirmationModal = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50 border-2 border-green-500">
      <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
      <p>Are you sure you want to delete this subscription?</p>
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

export default SubsTableItem;
