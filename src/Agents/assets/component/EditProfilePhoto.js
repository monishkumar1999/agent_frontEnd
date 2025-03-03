import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NOPROFILE_BASE = "http://localhost:8000"; // Base URL for profile images

const EditProfilePhoto = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const response = await axiosInstance.get("/agent/get-agent-details");
                if (response.data.data && response.data.data.profile_img) {
                    const fullImageUrl = `${NOPROFILE_BASE}${response.data.data.profile_img}`;
                    setImage(fullImageUrl);
                    setPreview(fullImageUrl);
                }
            } catch (error) {
                console.error("Error fetching profile image:", error);
                toast.error("❌ Failed to load profile image.");
            }
        };

        fetchProfileImage();
    }, []);

    // Handle Image Selection and Convert to Base64
    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (!file) {
            setImage(null); // 🔹 Clear image state if no file is selected
            setPreview(null);
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            toast.error("❌ File size should be less than 2MB.");
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const base64String = reader.result.split(",")[1]; // Extract Base64 part only
            setImage(base64String);
            setPreview(reader.result);
        };
    };

    // Handle Image Upload
    const handleSubmit = async (event) => {
        event.preventDefault();

        // 🔹 Ensure `image` is a valid Base64 string before uploading
        if (!image || !image.startsWith("/9j") && !image.startsWith("iVBORw0KG")) {
            toast.error("❌ Please upload a valid image.");
            return;
        }

        setLoading(true);

        try {
            const response = await axiosInstance.put("/agent/add-agent-details", {
                profile_img: image, // Send Base64 string
            });

            console.log("Upload Response:", response.data);

            if (response.data.message === "Agent details updated successfully") {
                toast.success("✅ Profile photo updated successfully!");
                setTimeout(() => {
                    navigate("/agents/profile");
                }, 2000);
            } else {
                toast.error("❌ Failed to update profile photo.");
            }
        } catch (error) {
            console.error("Error updating profile photo:", error);
            toast.error("❌ Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-900 via-purple-800 to-gray-900 text-white">
            <ToastContainer position="top-center" autoClose={3000} /> {/* ✅ Ensure toast works */}

            <h2 className="text-3xl font-bold mb-4 text-yellow-400">Upload Your Profile Photo</h2>

            <div className="w-40 h-40 rounded-full border-4 border-yellow-500 flex items-center justify-center overflow-hidden shadow-lg bg-gray-800">
                {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                    <p className="text-gray-400">No Image</p>
                )}
            </div>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col items-center">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-gray-900 hover:file:bg-yellow-400"
                />

                <button
                    type="submit"
                    className={`mt-4 px-6 py-2 font-bold rounded-lg transition duration-300 flex items-center justify-center ${
                        loading
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-yellow-500 text-gray-900 hover:bg-yellow-400"
                    }`}
                    disabled={loading}
                >
                    {loading ? (
                        <div className="flex items-center">
                            <svg
                                className="animate-spin h-5 w-5 mr-2 text-white"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 108 8h-4l3 3 3-3h-4a8 8 0 01-8-8z"
                                />
                            </svg>
                            Uploading...
                        </div>
                    ) : (
                        "Upload & Save"
                    )}
                </button>
            </form>
        </div>
    );
};

export default EditProfilePhoto;