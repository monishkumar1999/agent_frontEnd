import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { onEdit, onSave } from "./masterFunction";
import server from "../../constant"; // Adjust the import as per your structure
import { FaEdit, FaTrash } from "react-icons/fa";
import { div } from "framer-motion/client";

const Table = ({ describes = [], setDescribes, master, title }) => {

    const [editableRow, setEditableRow] = useState(null); // State to track the row being edited
    const [editedData, setEditedData] = useState({}); // State to store the edited data
    const [error, setError] = useState(null); // State for error handling
    const [loading, setLoading] = useState(false); // State to track loading status
    const token = useSelector((state) => state.auth.token); // Get token using useSelector hook

    const handleInputChange = (e) => {
        console.log(1)
        setEditedData({ ...editedData, [e.target.name]: e.target.value });
    };

    const onCancel = () => {
        setEditableRow(null); // Exit edit mode without saving
        setError(null); // Clear any errors
    };

    const onDelete = (_id) => {
        // Dismiss any currently active toasts before showing a new one
        toast.dismiss();

        // Show a confirmation toast
        toast((t) => (
            <div className="flex justify-between flex-col">
                <p className="px-3 py-2 shadow-sm rounded-md">Are you sure you want to delete this</p>
                <div className="space-x-2 px-3">
                    <button
                        onClick={async () => {
                            try {
                                // Send a DELETE request to the server with the describe _id
                                const response = await axios.delete(
                                    `${server}/${master}/delete`,
                                    {
                                        withCredentials: true,
                                        data: { _id }, // Sending the '_id' in the request body
                                    }
                                );

                                // If the deletion is successful, remove the item from the state
                                setDescribes(describes.filter((describe) => describe._id !== _id));

                                // Show success toast
                                toast.success(`${title} deleted successfully!`);
                            } catch (err) {
                                // If there's an error, show the error toast
                                toast.error(`Failed to delete ${title}`);
                                console.error("Error deleting describe:", err);
                            }
                            toast.dismiss(t.id); // Dismiss the confirmation toast after action
                        }}
                        className="bg-red-500 text-white px-3 py-1 rounded shadow-xl font-semibold"
                    >
                        Confirm
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)} // Dismiss the toast if user cancels
                        className="bg-gray-500 text-white px-3 py-1 rounded shadow-xl font-semibold"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ), {
            duration: Infinity, // Keeps the toast visible until user interacts
            position: "top-center",
        });
    };


    return (
        <div>

<table className="min-w-full table-auto border-collapse border border-gray-200 shadow-lg rounded-lg overflow-hidden">
  <thead>
    <tr className="bg-purple-500 text-white">
      <th className="border px-4 py-2 text-left">S.No</th>
      <th className="border px-4 py-2 text-left">Name</th>
      <th className="border px-4 py-2 text-center">Actions</th>
    </tr>
  </thead>
  <tbody>
    {describes && describes.length > 0 ? (
      describes.map((describe, index) => {
        if (!describe || !describe._id) {
          console.error("Invalid describe object:", describe);
          return null;
        }

        return (
          <tr
            key={describe._id}
            className="hover:bg-blue-50 transition-colors duration-200"
          >
            <td className="border px-4 py-2 text-gray-700 text-center font-semibold">
              {index + 1}
            </td>
            <td className="border px-4 py-2 text-gray-700 font-semibold">
              {editableRow === describe._id ? (
               <input
               type="text"
               name="newName"
               value={editedData.newName !== undefined ? editedData.newName : describe.name}
               onChange={handleInputChange}
               className="w-full h-full px-3 py-1 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
               style={{ fontSize: "inherit", lineHeight: "inherit" }}
             />
             
              ) : (
                <span className="block w-full h-full text-ellipsis overflow-hidden">
                  {describe.name}
                </span>
              )}
            </td>
            <td className="border px-4 py-2 text-center">
              {editableRow === describe._id ? (
                <>
                  <button
                    onClick={() =>
                      onSave(
                        describe._id,
                        setLoading,
                        editedData,
                        setDescribes,
                        setEditableRow,
                        setError,
                        token,
                        describes,
                        master
                      )
                    }
                    className="bg-green-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-green-600 transition-colors duration-200 disabled:opacity-50"
                    disabled={loading}
                  >
                    Save
                  </button>
                  <button
                    onClick={onCancel}
                    className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() =>
                      onEdit(describe._id, describe.name, setEditableRow, setEditedData)
                    }
                    className=" text-white px-3 py-1 rounded-md flex items-center justify-center  transition-colors duration-200"
                  >
                   <img
    src="/images/icons/edit.png" // Use the relative path from the `public` folder
    alt="Edit"
    className="mr-1 w-10 hover:bg-gray-100" // Adjust size if needed
  />
                  </button>
                  <button
                    onClick={() => onDelete(describe._id)}
                    className=" text-white px-3 py-1 rounded-md flex items-center justify-center  transition-colors duration-200"
                  >
                     <img
    src="/images/icons/trash.png" // Use the relative path from the `public` folder
    alt="Edit"
    className="mr-1 w-10 " // Adjust size if needed
  />
                  </button>
                </div>
              )}
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td
          colSpan="3"
          className="text-center px-4 py-6 text-gray-500 bg-gray-50"
        >
          No describes found
        </td>
      </tr>
    )}
  </tbody>
</table>

        </div>
    );
};

export default Table;
