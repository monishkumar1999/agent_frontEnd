import React from "react";
import Aheader from "./Aheader";
import Afooter from "./Afooter";

const Alayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Fixed Header */}
      <Aheader />

      {/* Main Content */}
      <main className="flex-grow bg-white pt-4">{children}</main>

      {/* Footer */}
      <Afooter />
    </div>
  );
};

export default Alayout;
