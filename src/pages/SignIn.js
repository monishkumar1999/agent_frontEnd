import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import InputField from "../pages/InputField"; // Ensure this path is correct
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast"
import Lottie from "lottie-react";
import load from "../lottiefiles/load.json";

function SignIn({ onLoginSuccess }) {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Ensure this is defined correctly

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateLoginForm = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!loginData.email) {
      newErrors.email = "Email cannot be empty";
    } else if (!emailRegex.test(loginData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!loginData.password) {
      newErrors.password = "Password cannot be empty";
    } else if (loginData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateLoginForm()) {
      setLoading(true);
      try {

        console.log(loginData)
        const response = await axiosInstance.post("/agent/login", loginData);
        onLoginSuccess(loginData.email);

        console.log(response);
        toast.success(response.data.message)
        // console.log("Login successful:", response.data);
      } catch (e) {
        console.log(e.response);
        toast.error(e.response.data.message)
        // console.error("Error during login:", error);
        setErrors({ apiError: "Invalid email or password" });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl md:text-2xl font-semibold text-center">Welcome Back</h3>
      <InputField label="Email" type="text" name="email" value={loginData.email} onChange={handleChange} error={errors.email} />
      <div className="relative">
        <InputField label="Password" type={showPassword ? "text" : "password"} name="password" value={loginData.password} onChange={handleChange} error={errors.password} />
        <button
          type="button"
          className="absolute right-3 top-9 text-gray-600"
          onClick={() => setShowPassword((prev) => !prev)} // Toggle password visibility
        >
          {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
        </button>
      </div>
      <div className="text-right text-sm md:text-base">
        <a href="#" className="text-blue-500">Forgot Password?</a>
      </div>
      <button type="submit" className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg flex items-center justify-center">
        {loading ? (
          <Lottie animationData={load} className="w-10 h-10" />
        ) : (
          "Login"
        )}
      </button>
      <button className="w-full flex items-center justify-center py-3 border rounded-lg mt-2">
        <img src="https://www.pngmart.com/files/16/Google-Logo-PNG-Image.png" alt="Google Logo" className="w-5 h-5 mr-2" /> Continue with Google
      </button>
      {errors.apiError && <p className="text-red-500 text-center">{errors.apiError}</p>}
    </form>
  );
}

export default SignIn;