import React, { useState } from 'react';

const Dashboard = () => {
  const [value, setValue] = useState("");
  return (
    <div>
      <div className="relative w-full max-w-md">
      <input
        id="floating-label-input"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="peer w-full border-2 border-purple-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-transparent"
        placeholder="Extra Large"
      />
      <label
        htmlFor="floating-label-input"
        className={`absolute left-3 top-3 text-gray-500 text-sm transition-all ${
          value
            ? "top-[-10px] text-black text-sm"
            : "peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base"
        } peer-focus:top-[-10px] peer-focus:text-black peer-focus:text-sm bg-white px-1 rounded-md`}
      >
        Extr
      </label>
    </div>

    </div>
  );
};

export default Dashboard;
