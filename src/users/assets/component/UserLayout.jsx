import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Header Component
const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 text-center">
      <h1>My Website</h1>
      <nav>
        <Link to="/" className="px-4">
          Home
        </Link>
        <Link to="/about" className="px-4">
          About
        </Link>
      </nav>
    </header>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center mt-auto">
      <p>&copy; 2025 My Website. All rights reserved.</p>
    </footer>
  );
};

// Main Layout Component
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4">{children}</main>
      <Footer />
    </div>
  );
};

// Sample Pages
const Home = () => <h2>Welcome to the Home Page</h2>;
const About = () => <h2>About Us</h2>;

// App Component with Routing
const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
