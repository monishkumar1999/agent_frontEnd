import { jwtDecode } from "jwt-decode";

export const getUserIdFromCookies = () => {
  const cookies = document.cookie.split("; ");
  const authTokenCookie = cookies.find((row) => row.startsWith("auth_token="));

 
  if (!authTokenCookie) return null; // No auth token found

  const token = authTokenCookie.split("=")[1];
  

  try {
    const decoded = jwtDecode(token);
    return decoded.userId || null; // Extract userId from JWT payload
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};
