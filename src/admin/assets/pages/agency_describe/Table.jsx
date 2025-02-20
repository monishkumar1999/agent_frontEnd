import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { onEdit, onSave } from "./describeFunctions";
import server from "../../constant"; // Adjust the import as per your structure
import { FaEdit, FaTrash } from "react-icons/fa";

const Table = ({ describes = [], setDescribes }) => {
    const [editableRow, setEditableRow] = useState(null); // State to track the row being edited
    const [editedData, setEditedData] = useState({}); // State to store the edited data
    const [error, setError] = useState(null); // State for error handling
    const [loading, setLoading] = useState(false); // State to track loading status
    const token = useSelector((state) => state.auth.token); // Get token using useSelector hook

    const handleInputChange = (e) => {
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
            <div className="flex justify-between">
                <p>Are you sure you want to delete this agency describe?</p>
                <div className="space-x-2">
                    <button
                        onClick={async () => {
                            try {
                                // Send a DELETE request to the server with the describe _id
                                const response = await axios.delete(
                                    `${server}/describeMaster/delete`,
                                    {
                                        withCredentials: true,
                                        data: { _id }, // Sending the '_id' in the request body
                                    }
                                );
    
                                // If the deletion is successful, remove the item from the state
                                setDescribes(describes.filter((describe) => describe._id !== _id));
    
                                // Show success toast
                                toast.success("Describe deleted successfully!");
                            } catch (err) {
                                // If there's an error, show the error toast
                                toast.error("Failed to delete describe");
                                console.error("Error deleting describe:", err);
                            }
                            toast.dismiss(t.id); // Dismiss the confirmation toast after action
                        }}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                        Confirm
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)} // Dismiss the toast if user cancels
                        className="bg-gray-500 text-white px-3 py-1 rounded"
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
           
            <table className="min-w-full table-auto border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border p-2">S.No</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {describes && describes.length > 0 ? (
                        describes.map((describe, index) => {
                            // Check if describe is a valid object and has the _id
                            if (!describe || !describe._id) {
                                console.error("Invalid describe object:", describe);
                                return null; // Skip invalid describe objects
                            }

                            return (
                                <tr key={describe._id}>
                                    <td className="border p-2">{index + 1}</td> {/* Serial number */}
                                    <td className="border p-2">
                                        {editableRow === describe._id ? (
                                            <input
                                                type="text"
                                                name="newName"
                                                value={editedData.newName || describe.name} // Ensure value is not undefined
                                                onChange={handleInputChange}
                                                className="peer w-56 shadow-xl border-2 px-4 rounded-lg focus:outline-none focus:ring-2  placeholder-slate-500"
                                            />
                                        ) : (
                                            describe.name
                                        )}
                                    </td>
                                    <td className="border p-2">
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
                                                            describes
                                                        )
                                                    }
                                                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                                    disabled={loading} // Disable button while loading
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={onCancel}
                                                    className="bg-gray-500 text-white px-2 py-1 rounded"
                                                    disabled={loading} // Disable button while loading
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                               <button
                                                    onClick={() =>
                                                        onEdit(describe._id, describe.name, setEditableRow, setEditedData)
                                                    }
                                                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                                                >
                                                    <FaEdit className="text-white" /> {/* Edit Icon */}
                                                </button>
                                                {/* Delete button */}
                                                <button
                                                    onClick={() => onDelete(describe._id)}
                                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                                >
                                                    <FaTrash className="text-white" /> {/* Delete Icon */}
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center p-2">No describes found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
