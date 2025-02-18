import { useState } from "react";
import Glogin from "./Glogin";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import loadingBtn from "./lottiefile/loadingBtn.json";
import Lottie from "lottie-react";

const SignInForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const [loading, setLoading] = useState(false);

  const validateEmail = (value) =>
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let errors = {};

    if (!validateEmail(email)) {
      errors.email = "Enter a valid email.";
    }

    if (!password) {
      errors.password = "Password is required.";
    }

    setErrorMessages(errors);

    if (Object.keys(errors).length === 0) {
      console.log("Submitting login request with:", { email, password });

      try {
        const response = await axiosInstance.post("/user/login", {
          email,
          password,
        });

        console.log("Login Response:", response);
        toast.success(response.data.message);
        onSubmit(email); // ✅ Pass email for OTP verification
      } catch (e) {
        console.error("Login Error:", e.response);
        toast.error(e.response?.data?.message || "Something went wrong!");
      }
    }

    setLoading(false);
  };

  return (
    <div className="w-full p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold text-center text-gray-800">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-600 mb-4">Login to your account</p>

        {/* Email */}
        <div className="mb-3">
          <label className="block text-gray-700 font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          {errorMessages.email && (
            <p className="text-red-500 text-xs mt-1">{errorMessages.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="block text-gray-700 font-semibold mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          {errorMessages.password && (
            <p className="text-red-500 text-xs mt-1">
              {errorMessages.password}
            </p>
          )}
        </div>

        {/* Forgot Password Link */}
        <div className="text-right mb-3">
          <a
            href="/forgot-password"
            className="text-blue-500 text-sm hover:underline"
          >
            Forgot Password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition flex justify-center items-center"
          disabled={loading || !email || !password}
        >
          {loading ? (
            <Lottie animationData={loadingBtn} className="w-10 h-10" />
          ) : (
            "Login"
          )}
        </button>

        <p className="text-center my-4 text-gray-500">or</p>
        <Glogin />
      </form>
    </div>
  );
};

export default SignInForm;
