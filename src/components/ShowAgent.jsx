import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import HeaderComponent from "./Header";
import Footer from "./Footer";
import { IMGURL, NOPROFILE } from "../utils/imgpath";
import axiosInstance from "../utils/axiosInstance";
import AgentFilterSidebar from "./AgentFilterSidebar";
import ListAgent from "./ListAgent";
import { HelpCircle } from "lucide-react";

const ShowAgent = () => {
  const [agentDetails, setAgentDetails] = useState(null);
  const [agents, setAgents] = useState([]);
  const [totalAgents, setTotalAgents] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [error, setError] = useState(null);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [propertyTypeError, setPropertyTypeError] = useState(null);
  const [purchaseOptions, setPurchaseOptions] = useState([]);
  const [optionsError, setOptionsError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const agentsPerPage = 5;
  const location = useLocation();

  const priceRanges = [
    "Less than $449,000",
    "$450,000–$699,999",
    "$700,000–$999,999",
    "$1m–$1.49m",
    "$1.5m–$2.49m",
    "$2.5m or more",
  ];

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const propertyResponse = await axiosInstance.get("/property/view");
        if (Array.isArray(propertyResponse.data.data)) {
          setPropertyTypes(propertyResponse.data.data);
        } else {
          throw new Error("Invalid property data format");
        }

        const purchaseResponse = await axiosInstance.get("/purchase/view");
        if (Array.isArray(purchaseResponse.data.data)) {
          setPurchaseOptions(purchaseResponse.data.data);
        } else {
          throw new Error("Invalid purchase data format");
        }
      } catch (error) {
        console.error("Error fetching options:", error);
        setOptionsError("Failed to load options");
      }
    };

    fetchOptions();
  }, []);

  const fetchAgent = async (details, page = 1) => {
    console.log("Fetching agents with details:", details);
    setLoading(true);

    const startTime = Date.now();

    try {
      const response = await axiosInstance.get("/users/findagent", {
        params: {
          location: details?.location || "",
          propertyType: details?.propertyType || "",
          page,
          limit: agentsPerPage,
        },
        timeout: 10000,
      });
      console.log("API response:", response);

      const data = Array.isArray(response.data.agents)
        ? response.data.agents
        : [];
      console.log("Processed agents data:", data);

      const elapsedTime = Date.now() - startTime;
      const remainingTime = 2000 - elapsedTime;

      if (remainingTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingTime));
      }

      setAgents(data);
      setTotalAgents(response.data.totalAgents || 0);
      setTotalPages(response.data.totalPages || 1);
      setCurrentPage(response.data.currentPage || page);
      console.log("Total pages from API:", response.data.totalPages);

      setLoading(false);
    } catch (err) {
      console.error("Error fetching agents:", err);

      const elapsedTime = Date.now() - startTime;
      const remainingTime = 2000 - elapsedTime;
      if (remainingTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingTime));
      }

      setError("Failed to fetch agents: " + err.message);
      setAgents([]);
      setTotalAgents(0);
      setTotalPages(1);
      setLoading(false);
    }
  };

  useEffect(() => {
    const details = location.state?.agentDetails || { location: "", propertyType: "" };
    console.log("Agent details from navigation:", details);
    setAgentDetails(details);
    fetchAgent(details, 1);
  }, [location]);

  const handleApplyFilters = () => {
    setFilterLoading(true);
    fetchAgent(agentDetails, 1);
    setFilterLoading(false);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchAgent(agentDetails, newPage);
    } else {
      setCurrentPage(1);
      fetchAgent(agentDetails, 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <HeaderComponent />
        <div className="container mx-auto py-12 px-4 animate-fade-in">
        
          <div className="space-y-8">
            {/* Filter Section */}
            <div className="max-w-5xl mx-auto ">
              <AgentFilterSidebar
                agentDetails={agentDetails}
                setAgentDetails={setAgentDetails}
                propertyTypes={propertyTypes}
                propertyTypeError={propertyTypeError}
                purchaseOptions={purchaseOptions}
                priceRanges={priceRanges}
                optionsError={optionsError}
                handleApplyFilters={handleApplyFilters}
                filterLoading={filterLoading}
                layout="horizontal"
              />
            </div>

            {/* Agent List Section with Shimmer Effect */}
            <div className="max-w-3xl mx-auto bg-white border rounded-xl shadow-lg p-6">
              <div className="sticky top-0 bg-white z-10 pb-4 border-b border-gray-200">
               
                <p className="text-sm text-gray-600 font-inter font-light">
                  {totalAgents} Agents
                </p>
              </div>
              <div className="mt-6">
                <div className="space-y-6">
                  {[...Array(3)].map((_, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-gray-50 to-gray-100 border rounded-xl p-6 shadow-md animate-pulse flex"
                    >
                      <div className="w-32 h-32 bg-gray-200 rounded-lg mr-4"></div>
                      <div className="flex-1">
                        <div className="h-5 bg-gray-200 rounded w-1/2 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer fIndMyAgent="/images/findmyagent.svg" copyrightIcon="/vector-4.svg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex justify-center items-center">
        <p className="text-red-500 text-lg font-inter">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <HeaderComponent />
      <div className="container mx-auto py-12 px-4 relative animate-fade-in">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900 font-poppins tracking-tight">
         
        </h1>

        <div className="space-y-8">
          {/* Horizontal Filter */}
          <div className="max-w-5xl mx-auto ">
            <AgentFilterSidebar
              agentDetails={agentDetails}
              setAgentDetails={setAgentDetails}
              propertyTypes={propertyTypes}
              propertyTypeError={propertyTypeError}
              purchaseOptions={purchaseOptions}
              priceRanges={priceRanges}
              optionsError={optionsError}
              handleApplyFilters={handleApplyFilters}
              filterLoading={filterLoading}
              layout="horizontal"
            />
          </div>

          {/* Agent List */}
          <div className="max-w-3xl mx-auto bg-white border rounded-xl shadow-lg p-6 relative">
            {agentDetails ? (
              <div className="space-y-4">
                <div className="sticky top-0 bg-white z-10 pb-4 border-b border-gray-200">
              
                  <p className="text-sm text-gray-600 font-inter font-light">
                    {totalAgents} Agents
                  </p>
                </div>
                <div className="mt-6">
                  <ListAgent
                    agents={agents}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    loading={filterLoading}
                    searchLocation={agentDetails?.location}
                    totalAgents={totalAgents}
                  />
                </div>
              </div>
            ) : (
              <p className="text-gray-600 font-inter font-light text-center">
                Please apply filters to see results.
              </p>
            )}

            {/* Help Button */}
            <button className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full p-3 shadow-lg hover:from-blue-600 hover:to-blue-800 transition transform hover:scale-105">
              <HelpCircle className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      <Footer fIndMyAgent="/images/findmyagent.svg" copyrightIcon="/vector-4.svg" />
    </div>
  );
};

export default ShowAgent;