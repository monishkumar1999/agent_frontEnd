import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";

import server from "../../constant";
import { onEdit, onSave } from "./roleFunction";

const RoleTable = ({ roles = [], setRoles }) => {
    const [editableRow, setEditableRow] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [loading, setLoading] = useState(false);
    const token = useSelector((state) => state.auth.token);

    const handleInputChange = (e) => {
        setEditedData({ ...editedData, [e.target.name]: e.target.value });
    };

    const onCancel = () => {
        setEditableRow(null); // Exit edit mode without saving
    };

    const onDelete = (_id) => {
        toast.dismiss();

        toast((t) => (
            <div className="flex justify-between">
                <p>Are you sure you want to delete this role?</p>
                <div className="space-x-2">
                    <button
                        onClick={async () => {
                            try {
                                const response = await axios.delete(
                                    `${server}/RoleMaster/delete`,
                                    {
                                        withCredentials: true,
                                        data: { _id },
                                    }
                                );

                                setRoles(roles.filter((role) => role._id !== _id));
                                toast.success("Role deleted successfully!");
                            } catch (err) {
                                toast.error("Failed to delete role");
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
            duration: Infinity,
            position: "top-center",
        });
    };

    return (
        <div>
            <table className="min-w-full table-auto border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border p-2">S.No</th>
                        <th className="border p-2">Role Name</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {roles && roles.length > 0 ? (
                        roles.map((role, index) => (
                            <tr key={role._id}>
                                <td className="border p-2">{index + 1}</td>
                                <td className="border p-2">
                                    {editableRow === role._id ? (
                                        <input
                                            type="text"
                                            name="newName"
                                            value={editedData.newName || role.name}
                                            onChange={handleInputChange}
                                            className="peer w-56 shadow-xl border-2 px-4 rounded-lg focus:outline-none focus:ring-2 placeholder-slate-500"
                                        />
                                    ) : (
                                        role.name
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editableRow === role._id ? (
                                        <>
                                            <button
                                                onClick={() =>
                                                    onSave(role._id, setLoading, editedData, setRoles, setEditableRow, token, roles)
                                                }
                                                className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                                disabled={loading}
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={onCancel}
                                                className="bg-gray-500 text-white px-2 py-1 rounded"
                                                disabled={loading}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() =>
                                                    onEdit(role._id, role.name, setEditableRow, setEditedData)
                                                }
                                                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                                            >
                                                <FaEdit className="text-white" />
                                            </button>
                                            <button
                                                onClick={() => onDelete(role._id)}
                                                className="bg-red-500 text-white px-2 py-1 rounded"
                                            >
                                                <FaTrash className="text-white" />
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center p-2">No roles found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default RoleTable;
