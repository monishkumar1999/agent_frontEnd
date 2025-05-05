import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Lottie from "lottie-react";
import load from "../lottiefiles/findAgentLoading.json";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

// Accessibility setup
Modal.setAppElement("#root");

const SubmissionModal = ({ isOpen, onClose, details }) => {
    const [loadingComplete, setLoadingComplete] = useState(true);
    const [isRegistering, setIsRegistering] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

  

    const validateForm = () => {
        const newErrors = {};

        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (isRegistering) {
            if (!name) newErrors.name = "Name is required";
            if (!phone || phone.length < 5) newErrors.phone = "Valid phone number required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateOtp = () => {
        const newErrors = {};
        if (!otp || otp.length !== 6) {
            newErrors.otp = "Please enter a valid 6-digit OTP";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const loginfunction = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            console.log("Initiating login/register request", { email, isRegistering });
            const endpoint = isRegistering ? "/users/register" : "/users/login";
            const payload = isRegistering
                ? { userDetails: { email, password, phone, name } }
                : { need: details, userDetails: { email, password } };

            const response = await axiosInstance.post(endpoint, payload);
            console.log("Login/register response:", response.data);

            if (response.data.status) {
                setShowOtpInput(true);
            }
        } catch (error) {
            console.error("Login/register error:", error);
            setErrors({
                ...errors,
                form: error.response?.data?.message || "An error occurred during login/register"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const verifyOtp = async (e) => {
        e.preventDefault();
        if (!validateOtp()) return;

        setIsLoading(true);
        try {
            console.log("Initiating OTP verification", { email, otp });
            const response = await axiosInstance.post(
                "/users/verify-otp",
                { email, otp },
                { timeout: 10000 }
            );
            console.log("OTP verification response:", response.data);

            if (response.data) {
                alert("OTP verified successfully!");
                // Navigate to ShowAgent with details
                navigate("/showAgent", { state: { agentDetails: details } });
                onClose();
                // Reset form
                setEmail("");
                setPassword("");
                setPhone("");
                setName("");
                setOtp("");
                setShowOtpInput(false);
                setIsRegistering(false);
            }
        } catch (error) {
            console.error("OTP verification error:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            setErrors({
                ...errors,
                otp: error.response?.data?.message || "Failed to verify OTP. Please try again."
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto my-8"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            closeTimeoutMS={300}
        >
            <div className="flex flex-col items-center text-center">
                {!loadingComplete ? (
                    <>
                        <Lottie animationData={load} className="w-40 h-40 md:w-60 md:h-60" />
                        <h2 className="text-xl font-semibold mt-4">Finding Your Perfect Agent Match...</h2>
                        <p className="text-xs mt-2">
                            We’re shortlisting top agents tailored just for you. To unlock your personalised agent matches, please sign in or create your account.
                        </p>
                    </>
                ) : (
                    <h2 className="text-xl font-semibold mb-2">🎉 Your Agent is Ready!</h2>
                )}

                <p className="text-sm font-medium mt-4">
                    <strong>Get 3 free consultations</strong> with experienced buyer’s agents – no obligations.
                </p>

                {showOtpInput ? (
                    <form className="w-full mt-6 space-y-4" onSubmit={verifyOtp}>
                        <div>
                            <input
                                type="text"
                                placeholder="Enter 6-digit OTP"
                                className={`w-full border rounded-md px-3 py-2 ${errors.otp ? "border-red-500" : ""}`}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                maxLength={6}
                            />
                            {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-pink-600 text-white py-2 rounded-md font-medium disabled:opacity-50"
                            disabled={isLoading}
                        >
                            {isLoading ? "Verifying..." : "Verify OTP"}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setShowOtpInput(false);
                                setOtp("");
                                setErrors({});
                            }}
                            className="text-sm text-pink-600 font-semibold mt-2"
                        >
                            Back to Login/Register
                        </button>
                    </form>
                ) : (
                    <form className="w-full mt-6 space-y-4" onSubmit={loginfunction}>
                        {isRegistering && (
                            <div>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className={`w-full border rounded-md px-3 py-2 ${errors.name ? "border-red-500" : ""}`}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>
                        )}

                        <div>
                            <input
                                type="text"
                                placeholder="Email"
                                className={`w-full border rounded-md px-3 py-2 ${errors.email ? "border-red-500" : ""}`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                className={`w-full border rounded-md px-3 py-2 ${errors.password ? "border-red-500" : ""}`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>

                        {isRegistering && (
                            <div>
                                <div className="flex items-center gap-2">
                                    <select className="border rounded-md px-3 py-2">
                                        <option value="+61">+61</option>
                                        <option value="+91">+91</option>
                                        <option value="+1">+1</option>
                                    </select>
                                    <input
                                        type="text"
                                        placeholder="Phone number"
                                        className={`flex-1 border rounded-md px-3 py-2 ${errors.phone ? "border-red-500" : ""}`}
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>
                        )}

                        {errors.form && <p className="text-red-500 text-xs mt-1">{errors.form}</p>}

                        <div className="flex justify-between items-center text-sm">
                            {!isRegistering && (
                                <a href="#" className="text-blue-600 font-semibold ml-auto">
                                    Forgot Password?
                                </a>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-pink-600 text-white py-2 rounded-md font-medium disabled:opacity-50"
                            disabled={isLoading}
                        >
                            {isLoading ? "Processing..." : isRegistering ? "Continue" : "Login"}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setIsRegistering(!isRegistering);
                                setErrors({});
                            }}
                            className="text-sm text-pink-600 font-semibold mt-2"
                        >
                            {isRegistering ? "Already have an account? Login" : "New here? Register"}
                        </button>
                    </form>
                )}
            </div>
        </Modal>
    );
};

export default SubmissionModal;