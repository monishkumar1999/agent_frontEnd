import React, { useState, useEffect } from "react";
import AgentViewForm from "./AgentViewForm";
import Pagination from "./Pagination";
import axiosInstance from "../../../../utils/axiosInstance";
import AgentModal from "./AgentModal";
import AgentList from "./AgentList"; // Updated component

const AgentView = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 6;
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    status: "",
  });
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const fetchData = async (page = 1) => {
    try {
      const response = await axiosInstance.post("/admin/agent-view", {
        ...filters,
        searchQuery, // Include the search query in the request
        page,
        limit: itemsPerPage,
      });

      const { agents, totalPages } = response.data;
      setData(agents);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage); // Fetch data when filters, search, or page change
  }, [filters, currentPage, searchQuery]); // Watch for changes in filters, searchQuery, or currentPage

  const handleApproval = async (id, is_approval) => {
    try {
      await axiosInstance.put("/admin/agents/approve", { id, is_approval });
      setData((prevData) =>
        prevData.map((agent) =>
          agent._id === id ? { ...agent, is_approval } : agent
        )
      );
    } catch (error) {
      console.error("Error updating approval status:", error);
    }
  };

  return (
    <div className="min-h-screen py-6">
      <h2 className="text-xl font-bold mb-4">Date Selection Form</h2>
      <AgentViewForm setFilters={setFilters} />

      <div className="py-6">
        <h2 className="text-xl font-bold mb-4">Agent List</h2>

  

        {/* Updated to display cards instead of a table */}
        <AgentList
          data={data}
          handleApproval={handleApproval}
          setSelectedAgent={setSelectedAgent}
        />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default AgentView;
