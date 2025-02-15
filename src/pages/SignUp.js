import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Lottie from "lottie-react";
import InputField from "../pages/InputField"; // Ensure this path is correct
import axiosInstance from "../utils/axiosInstance";
import load from "../lottiefiles/load.json";
import toast from "react-hot-toast"

function SignUp({ onSignupSuccess }) {
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // For confirm password toggle

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Allow only numbers and restrict to 10 digits
      const numericValue = value.replace(/\D/g, "").slice(0, 10);
      setSignupData((prevData) => ({
        ...prevData,
        [name]: numericValue,
      }));
    } else {
      setSignupData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const validateSignupForm = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!signupData.firstName) {
      newErrors.firstName = "First Name cannot be empty";
    } else if (!/^[A-Z][a-z]*$/.test(signupData.firstName)) {
      newErrors.firstName = "First Name must start with a capital letter and contain no integers.";
    }

    if (!signupData.lastName) {
      newErrors.lastName = "Last Name cannot be empty";
    } else if (!/^[A-Z][a-z]*$/.test(signupData.lastName)) {
      newErrors.lastName = "Last Name must start with a capital letter and contain no integers.";
    }

    if (!signupData.email) {
      newErrors.email = "Email cannot be empty";
    } else if (!emailRegex.test(signupData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!signupData.phone) {
      newErrors.phone = "Phone number cannot be empty";
    } else if (!signupData.phone.match(/^[6789]\d{9}$/)) {
      newErrors.phone = "Invalid phone number. Must be a 10-digit number starting with 6, 7, 8, or 9.";
    }

    if (!signupData.password) {
      newErrors.password = "Password cannot be empty";
    } else if (signupData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const registerUser = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/agent/register", signupData);
      onSignupSuccess(signupData.email);
      console.log(response);
        toast.success(response.data.message)
      // console.log("Signup successful:", response.data);
    } catch (e) {
      console.log(e.response);
        toast.error(e.response.data.message)
      // console.error("Error during signup:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateSignupForm()) {
      registerUser();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl md:text-2xl font-semibold text-center">Create an Account</h3>
      
      <InputField label="First Name" type="text" name="firstName" value={signupData.firstName} onChange={handleChange} error={errors.firstName} />
      <InputField label="Last Name" type="text" name="lastName" value={signupData.lastName} onChange={handleChange} error={errors.lastName} />
      <InputField label="Email" type="text" name="email" value={signupData.email} onChange={handleChange} error={errors.email} />
      
      {/* Phone number field with 10-digit limit */}
      <InputField 
        label="Phone Number" 
        type="text" 
        name="phone" 
        value={signupData.phone} 
        onChange={handleChange} 
        error={errors.phone} 
        placeholder="10-digit phone number" 
        maxLength={10} // Enforces max length in input field
      />

      {/* Password Field with Eye Icon */}
      <div className="relative">
        <InputField 
          label="Password" 
          type={showPassword ? "text" : "password"} 
          name="password" 
          value={signupData.password} 
          onChange={handleChange} 
          error={errors.password} 
        />
        <button
          type="button"
          className="absolute right-3 top-9 text-gray-600"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={20}/> : "👁"} {/* Toggle eye icon */}
        </button>
      </div>

      {/* Confirm Password Field with Eye Icon */}
      <div className="relative">
        <InputField 
          label="Confirm Password" 
          type={showConfirmPassword ? "text" : "password"} 
          name="confirmPassword" 
          value={signupData.confirmPassword} 
          onChange={handleChange} 
          error={errors.confirmPassword} 
        />
        <button
          type="button"
          className="absolute right-3 top-9 text-gray-600"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? <EyeOff size={20}/> : "👁"}
        </button>
      </div>

      <button type="submit" className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg flex items-center justify-center">
        {loading ? (
          <Lottie animationData={load} className="w-10 h-10" />
        ) : (
          "Sign Up"
        )}
      </button>
    </form>
  );
}

export default SignUp;
