import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow  bg-gray-100 mt-16">{children}</main>

      {/* footer*/}

      <Footer />
    </div>
  );
};

export default Layout;
