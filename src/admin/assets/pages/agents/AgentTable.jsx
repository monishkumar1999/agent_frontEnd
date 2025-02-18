import React from "react";
import { Link } from "react-router-dom";

const AgentTable = ({ data, handleApproval }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4">
      <h3 className="text-lg font-semibold mb-4">Submitted Data</h3>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Phone</th>
            <th className="border border-gray-300 px-4 py-2">Approval</th>
            <th className="border border-gray-300 px-4 py-2">Subscription</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
            <th className="border border-gray-300 px-4 py-2">Details</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="border border-gray-300 px-4 py-2">{item.firstName || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">{item.email || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">{item.phone || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.is_approval === "1" ? "Approved" : "Pending"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.isSubscription === "1" ? "Subscribed" : "Not Subscribed"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                    onClick={() => handleApproval(item._id, "1")}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleApproval(item._id, "0")}
                  >
                    Decline
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {/* ✅ Navigate to agent details page */}
                  <Link
  to={`/admin/agent-details/${item._id}`}
  className="bg-blue-500 text-white px-3 py-1 rounded"
  target="_blank"
  rel="noopener noreferrer"
>
  View
</Link>

                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center text-gray-500 py-2">
                No agents found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AgentTable;
