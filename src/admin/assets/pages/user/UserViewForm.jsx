import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { Calendar } from "lucide-react";

const AgentViewForm = ({ setFilters }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");


  const handleSubmit = () => {
    if (!fromDate || !toDate ) {
      alert("Please fill in all fields.");
      return;
    }

    // Set filters state from the form values
    setFilters({ fromDate, toDate });

  };

  return (
    <div className="p-6 rounded-lg w-full max-w-5xl">
      {/* FORM CONTAINER - STACK ON MOBILE, FLEX ON LARGE SCREENS */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* FROM DATE */}
        <div className="w-full space-y-2">
          <label className="block font-medium text-gray-700">From Date</label>
          <Popover>
            <PopoverTrigger className="flex items-center gap-2 px-4 py-2 border rounded-lg shadow-sm bg-white hover:bg-gray-50 w-full">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span>{fromDate ? format(new Date(fromDate), "PPP") : "Select a date"}</span>
            </PopoverTrigger>
            <PopoverContent className="bg-white p-3 shadow-lg rounded-lg z-50">
              <input
                type="date"
                className="px-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* TO DATE */}
        <div className="w-full space-y-2">
          <label className="block font-medium text-gray-700">To Date</label>
          <Popover>
            <PopoverTrigger className="flex items-center gap-2 px-4 py-2 border rounded-lg shadow-sm bg-white hover:bg-gray-50 w-full">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span>{toDate ? format(new Date(toDate), "PPP") : "Select a date"}</span>
            </PopoverTrigger>
            <PopoverContent className="bg-white p-3 shadow-lg rounded-lg z-50">
              <input
                type="date"
                className="px-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </PopoverContent>
          </Popover>
        </div>

        
        {/* SUBMIT BUTTON */}
        <div className="w-full flex justify-center md:justify-start">
          <button
            className="w-full md:w-auto bg-blue-500 text-white font-medium px-6 rounded-lg hover:bg-blue-600 transition"   
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentViewForm;
