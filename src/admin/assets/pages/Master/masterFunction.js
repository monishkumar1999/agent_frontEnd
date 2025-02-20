import axios from "axios";
import server from "../../constant";
import toast from "react-hot-toast";

export const onEdit = (id, name, setEditableRow, setEditedData) => {
    setEditableRow(id); // Set the row to edit mode
    setEditedData({ name, newName: name }); // Initialize the edited data with the current value
};

export const onSave = async (id, setLoading, editedData, setDescribes, setEditableRow, setError, token, describes,master) => {
    setLoading(true);
    try {
        const response = await axios.put(
            `${server}/${master}/edit`,
            {
                name: editedData.name, 
                newName: editedData.newName,
            },
            {
                withCredentials: true,
            }
        );

        toast.success(`${master } updated successfully!`);

        // Update local state with new data
        const updatedDescribes = describes.map((describe) =>
            describe._id === id
                ? { ...describe, name: editedData.newName }
                : describe
        );
        setDescribes(updatedDescribes);
        setEditableRow(null); // Exit edit mode
    } catch (err) {
        // Extract the error message from the response object
        const errorMessage = err.response?.data?.message || err.message || "An unexpected error occurred.";
        console.error("Error updating describe:", errorMessage);
        toast.error(errorMessage); // Show error message from server
    } finally {
        setLoading(false);
    }
};

