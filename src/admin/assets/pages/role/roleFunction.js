import axios from 'axios';
import toast from 'react-hot-toast';
import server from '../../constant';

export const onEdit = (id, name, setEditableRow, setEditedData) => {
    setEditableRow(id);
    setEditedData({ name, newName: name });
};

export const onSave = async (id, setLoading, editedData, setRoles, setEditableRow, token, roles) => {
    setLoading(true);
    try {
        const response = await axios.put(
            `${server}/roleMaster/edit`,
            {
                name: editedData.name,
                newName: editedData.newName,
            },
            {
                withCredentials: true,
            }
        );

        toast.success('Role updated successfully!');

        const updatedRoles = roles.map((role) =>
            role._id === id ? { ...role, name: editedData.newName } : role
        );
        setRoles(updatedRoles);
        setEditableRow(null);
    } catch (err) {
        toast.error('Failed to update role');
    } finally {
        setLoading(false);
    }
};
