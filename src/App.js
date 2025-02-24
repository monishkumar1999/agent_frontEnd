import React from "react";
import { Toaster } from "react-hot-toast"; // Import Toaster
import Router from "./Router"; // Import Router component

export default function App() {
  return (
    <React.Fragment>
      <Toaster/>
      <Router/> 
    </React.Fragment>
  );
}