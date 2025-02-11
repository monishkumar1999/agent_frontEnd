import { useState } from "react";

const LoginForm = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsernameOrEmailChange = (e) => {
    if (e.target.value.length <= 30) {
      setUsernameOrEmail(e.target.value);
    }
  };

  const handlePhoneChange = (e) => {
    const onlyNumbers = e.target.value.replace(/\D/g, ""); // Removes non-numeric characters
    setPhone(onlyNumbers);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password !== e.target.value) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!usernameOrEmail || !phone || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }
    if (error) {
      alert("Please fix the errors before submitting");
      return;
    }
    alert("Form submitted successfully!");
  };

  return (
    <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg mx-auto ">
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
          Create an Account
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Sign up with your details
        </p>

        {/* Username or Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1 text-sm">
            Username or Email
          </label>
          <input
            type="email"
            placeholder="Enter your Username or Email"
            value={usernameOrEmail}
            onChange={handleUsernameOrEmailChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1 text-sm">
            Phone No
          </label>
          <input
            type="tel"
            placeholder="123-456"
            value={phone}
            onChange={handlePhoneChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1 text-sm">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter the Password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1 text-sm">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Enter the above given Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            aria-describedby="confirmPasswordError"
          />
          {error && (
            <p id="confirmPasswordError" className="text-red-500 text-xs mt-1">
              {error}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition text-sm"
          disabled={error !== ""}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
