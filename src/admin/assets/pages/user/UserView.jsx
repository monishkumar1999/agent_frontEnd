import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import axiosInstance from "../../../../utils/axiosInstance";
import UserList from "./UserList";

const UserView = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 6;
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true); // ✅ Loading state

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Immediately set searchQuery
  };

  const fetchData = async (page = 1) => {
    setLoading(true); // ✅ Show loading state
    try {
      const response = await axiosInstance.get(
        `/admin/users-view?page=${page}&limit=${itemsPerPage}`,
        { params: { searchQuery } }
      );

      const { data, totalPages } = response.data;
      setUsers(data);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setLoading(false); // ✅ Hide loading state after data fetch
  };

  useEffect(() => {
    fetchData(currentPage); // Fetch data on page or search query change
  }, [currentPage, searchQuery]); // Re-run when either `currentPage` or `searchQuery` changes

  return (
    <div className="min-h-screen py-6">
      <h2 className="text-xl font-bold mb-4">User List</h2>

      {/* Search input */}
      <input
          type="text"
          className="w-1/3 px-4 py-2 text-lg border-2 border-gray-300 rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all mb-2"
          placeholder="Search users..."
          onChange={handleSearchChange}
          value={searchQuery}
        />

      {/* User List Component with loading */}
      <UserList data={users} loading={loading} />

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default UserView;
