import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const AgentRouteWrapper = () => {
    const location = useLocation(); // Detect route changes
    const navigate = useNavigate(); // Correctly call useNavigate at the top level

    useEffect(() => {
        const token = Cookies.get("authToken"); // Retrieve JWT token from cookies

       console.log(token)
        if (token) {
            try {
                const decodedToken = jwtDecode(token); // Decode the JWT token
                console.log("Decoded Token:", decodedToken); // Print decoded token in console

                // Redirect if role is not 'agent'
                if (decodedToken.role !== 'agent') {
                  
                    navigate("/"); // Redirect to a forbidden page or home
                }

            } catch (error) {
                console.error("Invalid token", error);
             
                navigate("/"); // Redirect to login on error
            }
        } else {
            console.warn("No token found");
           
            navigate("/"); // Redirect if no token found
        }
    }, [location.pathname, navigate]); // Ensure it runs on route change

    return <Outlet />;
};

<<<<<<< HEAD
export default AgentRouteWrapper;
=======
export default AgentRouteWrapper;
>>>>>>> 3c1ac80b35c8c3670e0e3727fef94f4ad94aa32a
