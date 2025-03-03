// src/routes/UserAppRouteWrapper.js
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const UserAppRouteWrapper = () => {
  const location = useLocation(); // Detect route changes
  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    const token = Cookies.get("authToken"); // Retrieve JWT token from cookies

    console.log(token);
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode the JWT token
        console.log("Decoded Token:", decodedToken); // Debugging log

        // ✅ Ensure only users with role "user" can access
        if (decodedToken.role !== "user") {
          navigate("/", { replace: true }); // Redirect unauthorized users to home
        }
      } catch (error) {
        console.error("Invalid token", error);
        navigate("/", { replace: true }); // Redirect on invalid token
      }
    } else {
      console.warn("No token found");
      navigate("/", { replace: true }); // Redirect if no token is found
    }
  }, [location.pathname, navigate]); // Runs on every route change

  return <Outlet />; // Render child components only if authentication passes
};

export default UserAppRouteWrapper;
