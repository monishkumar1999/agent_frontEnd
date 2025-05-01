import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
import server from '../../constant';
import Table from './RoleTable';
import toast from 'react-hot-toast';

const Role = () => {
    const token = useSelector((state) => state.auth.token);
    const [roles, setRoles] = useState([]);  // Stores list of roles
    const [loading, setLoading] = useState(false);  // Loading state
    const [error, setError] = useState(null);  // Error state
    const [newRoleName, setNewRoleName] = useState('');  // For new role name
    const [adding, setAdding] = useState(false);  // To track if a new role is being added

    // Fetch existing roles on component mount or when token changes
    const fetchRoles = async () => {
       

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${server}/roleMaster/view`, {
                withCredentials: true,
            });
            setRoles(response.data.data);  // Set the list of roles
        } catch (error) {
            toast.error('Failed to fetch roles.');
            setError(error.response?.data?.message || 'An error occurred while fetching roles.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, [token]);  // Runs only when the token changes

    // Handle input changes for the new role name
    const handleInputChange = (e) => {
        setNewRoleName(e.target.value);
    };

    // Handle adding a new role
    const handleAddRole = async (e) => {
        e.preventDefault();
        if (!newRoleName.trim()) {
            toast.error('Please enter a name for the role.');
            return;
        }

        setAdding(true);
        setError(null); // Clear any previous errors

        try {
            const response = await axios.post(
                `${server}/roleMaster/addRole`,
                { name: newRoleName },
                {
                    withCredentials: true,
                }
            );
            toast.success('Role added successfully!');

            // Re-fetch the roles after adding a new one
            fetchRoles();

            setNewRoleName('');  // Reset input field after success
        } catch (error) {
            toast.error(error.response?.data?.message);
            setError(error.response?.data?.message || 'An error occurred while adding role.');
        } finally {
            setAdding(false);  // Stop adding state
        }
    };

    return (
        <div>
            <h1 className="text-xl font-bold mb-4">Role List</h1>

            {/* Form to add new role */}
            <form onSubmit={handleAddRole} className="mb-4">
                <div className="flex space-x-4">
                    <input
                        type="text"
                        value={newRoleName}
                        onChange={handleInputChange}
                        placeholder="Enter new role name"
                        className="peer w-56 shadow-xl border-2 px-4 rounded-lg focus:outline-none focus:ring-2 placeholder-slate-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded shadow-xl font-bold"
                        disabled={adding}  // Disable while adding
                    >
                        {adding ? 'Adding...' : 'Add Role'}
                    </button>
                </div>
            </form>

            {/* Loading and error handling */}
            {loading && <p>Loading...</p>}

            {/* Table to display roles */}
            <Table roles={roles} setRoles={setRoles} />
        </div>
    );
};

export default Role;
