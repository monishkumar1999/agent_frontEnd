import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import loadingBtn from "../user/lottiefile/loadingBtn.json";
import Lottie from "lottie-react";

const LoginForm = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateUsername = (value) => value.length <= 20;

  const validateEmail = (value) =>
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value);

  const validatePhone = (value) => /^[0-9]{9,12}$/.test(value);

  const validatePassword = (value) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/.test(
      value
    );

  const handleInputChange = (setter, field, value) => {
    setter(value);
    let errors = { ...errorMessages };

    if (field === "username") {
      if (!validateUsername(value))
        errors.username = "Username must be 20 characters or less.";
      else delete errors.username;
    }

    if (field === "email") {
      if (!validateEmail(value)) errors.email = "Enter a valid email.";
      else delete errors.email;
    }

    if (field === "phone") {
      if (!validatePhone(value)) errors.phone = "Phone must be 9-12 digits.";
      else delete errors.phone;
    }

    if (field === "password") {
      if (!validatePassword(value))
        errors.password =
          "Password: 6-12 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char.";
      else delete errors.password;
    }

    if (field === "confirmPassword") {
      if (value !== password)
        errors.confirmPassword = "Passwords do not match.";
      else delete errors.confirmPassword;
    }

    setErrorMessages(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};

    if (!validateUsername(username)) errors.username = "Enter a Username";
    if (!validateEmail(email)) errors.email = "Enter a valid email.";
    if (!validatePhone(phone)) errors.phone = "Phone must be 9-12 digits.";
    if (!validatePassword(password))
      errors.password =
        "Password: 6-12 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char.";
    if (password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match.";

    setErrorMessages(errors);

    if (Object.keys(errors).length === 0) {
      // console.log("Submitted Details:");
      // console.log("Username:", username);
      // console.log("Email:", email);
      // console.log("Phone:", phone);
      // console.log("Password:", password);
      // alert("Form submitted successfully!");
      // Pass the email and phone to the OTPForm component

      // button loading start
      setLoading(true);
      try {
        const response = await axiosInstance.post("/user/add", {
          userName: username,
          email: email,
          mobile: phone,
          password: password,
        });

        console.log(response);
        toast.success(response.data.message);
        onSubmit();
      } catch (e) {
        console.log(e.response);
        toast.error(e.response.data.message);
      }
      setLoading(false);
      // button loading end
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg mx-auto">
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
          Create an Account
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Sign up with your details
        </p>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1 text-sm">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) =>
              handleInputChange(setUsername, "username", e.target.value)
            }
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          {errorMessages.username && (
            <p className="text-red-500 text-xs mt-1">
              {errorMessages.username}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1 text-sm">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              handleInputChange(setEmail, "email", e.target.value)
            }
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          {errorMessages.email && (
            <p className="text-red-500 text-xs mt-1">{errorMessages.email}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1 text-sm">
            Phone No
          </label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) =>
              handleInputChange(
                setPhone,
                "phone",
                e.target.value.replace(/\D/g, "")
              )
            }
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          {errorMessages.phone && (
            <p className="text-red-500 text-xs mt-1">{errorMessages.phone}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1 text-sm">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              handleInputChange(setPassword, "password", e.target.value)
            }
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          {errorMessages.password && (
            <p className="text-red-500 text-xs mt-1">
              {errorMessages.password}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1 text-sm">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) =>
              handleInputChange(
                setConfirmPassword,
                "confirmPassword",
                e.target.value
              )
            }
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          {errorMessages.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errorMessages.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition text-sm"
        >
          {loading ? (
            <Lottie animationData={loadingBtn} className="w-10 h-10" />
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
