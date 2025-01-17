import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
import server from '../../constant';
import Table from './Table';
import toast from 'react-hot-toast';

const Describe = () => {
    const token = useSelector((state) => state.auth.token);
    const [describes, setDescribes] = useState([]);  // Stores list of describes
    const [loading, setLoading] = useState(false);  // Loading state
    const [error, setError] = useState(null);  // Error state
    const [newDescribeName, setNewDescribeName] = useState('');  // For new describe name
    const [adding, setAdding] = useState(false);  // To track if a new describe is being added

    // Fetch existing describes on component mount or when token changes
    const fetchDescribes = async () => {
        if (!token) return;

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${server}/master/view`, {
                withCredentials: true,
            });
            setDescribes(response.data.data);  // Set the list of describes
        } catch (error) {
            toast.error('Failed to fetch describes.');
            setError(error.response?.data?.message || 'An error occurred while fetching describes.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDescribes();
    }, [token]);  // Runs only when the token changes

    // Handle input changes for the new describe name
    const handleInputChange = (e) => {
        setNewDescribeName(e.target.value);
    };

    // Handle adding a new describe
    const handleAddDescribe = async (e) => {
        e.preventDefault();
        if (!newDescribeName.trim()) {
            toast.error('Please enter a name for the describe.');
            return;
        }

        setAdding(true);
        setError(null); // Clear any previous errors

        try {
            const response = await axios.post(
                `${server}/master/add`,
                { name: newDescribeName },
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );
            toast.success('Describe added successfully!');

            // Re-fetch the describes after adding a new one
            fetchDescribes();

            setNewDescribeName('');  // Reset input field after success
        } catch (error) {
        
            toast.error(error.response?.data?.message);
            setError(error.response?.data?.message || 'An error occurred while adding describe.');
        } finally {
            setAdding(false);  // Stop adding state
        }
    };

    return (
        <div>
            <h1 className="text-xl font-bold mb-4">Describe List</h1>

            {/* Form to add new describe */}
            <form onSubmit={handleAddDescribe} className="mb-4">
                <div className="flex space-x-4">
                    <input
                        type="text"
                        value={newDescribeName}
                        onChange={handleInputChange}
                        placeholder="Enter new describe name"
                      className="peer w-56 shadow-xl border-2 px-4 rounded-lg focus:outline-none focus:ring-2  placeholder-slate-500"
                    />

                    
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded shadow-xl font-bold"
                        disabled={adding}  // Disable while adding
                    >
                        {adding ? 'Adding...' : 'Add Describe'}
                    </button>
                </div>
            </form>

            {/* Loading and error handling */}
            {loading && <p>Loading...</p>}
           

            {/* Table to display describes */}
            <Table describes={describes} setDescribes={setDescribes} />
        </div>
    );
};

export default Describe;
