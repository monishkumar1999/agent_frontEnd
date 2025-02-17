import React, { useState } from "react";
import AgentViewForm from "./AgentViewForm";

const AgentView = () => {

  return (
    <div className="min-h-screen  py-6">
      <h2 className="text-xl font-bold mb-4">Date Selection Form</h2>

      {/* FORM CONTAINER */}
      <AgentViewForm/>

      {/* TABLE SECTION */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Submitted Data</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">From Date</th>
              <th className="border border-gray-300 px-4 py-2">To Date</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
           
              <tr>
                <td colSpan="3" className="text-center text-gray-500 py-2">
                  No data available
                </td>
              </tr>
     
          </tbody>
        </table>

        <div className="join">
  <button className="join-item btn btn-sm">1</button>
  <button className="join-item btn btn-sm btn-active">2</button>
  <button className="join-item btn btn-sm">3</button>
  <button className="join-item btn btn-sm">4</button>
</div>
      </div>
    </div>
  );
};

export default AgentView;
