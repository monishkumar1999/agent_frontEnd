// App.js
import React from "react";
import Router from "./Router"; // Import Router component

export default function App() {
  return (
    <React.Fragment>
      <Router /> {/* Router component will provide the routing context */}
    </React.Fragment>
  );
}
