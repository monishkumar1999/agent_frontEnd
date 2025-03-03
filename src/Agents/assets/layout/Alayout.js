import React from "react";
import Aheader from "./Aheader";
import Afooter from "./Afooter";

const Alayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Header */}
      <Aheader />

      {/* Main Content */}
      <main className="flex-grow  bg-gray-100 mt-16">{children}</main>

      {/* footer*/}

      <Afooter />
    </div>
  );
};

export default Alayout;
