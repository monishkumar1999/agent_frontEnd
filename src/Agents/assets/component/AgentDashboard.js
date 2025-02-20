import React from "react";
import AgentNavbar from "./AgentNavbar";

const AgentDashboard = () => {
  return (
    
    <div className="bg-white rounded shadow-lg text-center">
      <AgentNavbar/>
        <h2 className="text-2xl font-bold text-green-600">Success!</h2>
        <p className="text-gray-700 mt-2">You have successfully logged in.</p>
      
      
      <h1>Agent Dashboard</h1>
      </div>
      
  );
};

export default AgentDashboard;
