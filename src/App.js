import React from "react";
import { Toaster } from "react-hot-toast"; // Import Toaster
import Router from "./Router"; // Import Router component

export default function App() {
  return (
    <React.Fragment>
      <Toaster /> {/* Add Toaster */}
      <Router /> {/* Router component will provide the routing context */}
    </React.Fragment>
  );
}