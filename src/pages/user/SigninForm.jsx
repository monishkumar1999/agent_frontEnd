import { useState } from "react";
import MailForm from "./MailForm";

const SignInForm = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsernameOrEmailChange = (e) => {
    setUsernameOrEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation example (you can improve this further)
    if (!usernameOrEmail || !password) {
      setError("Please fill in both fields.");
      return;
    }

    if (error) {
      alert("Please fix the errors before submitting");
      return;
    }

    alert("Logged in successfully!");
  };

  return (
    <div className="w-full p-6 bg-white shadow-lg rounded-lg h-200px">
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold text-center text-gray-800">
          Welcome Back !!
        </h2>
        <p className="text-center text-gray-600 mb-4">Login to your Account</p>

        <div className="mb-3">
          <label className="block text-gray-700 font-semibold mb-1">
            Username or Email
          </label>
          <input
            type="text"
            placeholder="Enter your Username or Email"
            value={usernameOrEmail}
            onChange={handleUsernameOrEmailChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700 font-semibold mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </button>

        <p className="text-center my-4 text-gray-500">or</p>

        <MailForm />
      </form>
    </div>
  );
};

export default SignInForm;
