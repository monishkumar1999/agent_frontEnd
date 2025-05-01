import React, { useState } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import FormFooter from "../components/FormFooter";

function LogINForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = "/verify";
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex">
      {/* Left Section */}
      <div className="flex-1 p-8 lg:p-12">
        <div className="max-w-[420px] mx-auto">
          {/* Logo */}
          <h1 className="text-[22px] font-bold text-[#7F56D9] mb-12">
          Buyers First

          </h1>

          {/* Back Button */}
          <button className="flex items-center text-[#475467] mb-8">
            <ArrowLeft className="w-5 h-5 mr-2" />
          </button>

          {/* Form Header */}
          <h2 className="text-[30px] font-semibold text-[#101828] mb-2">
            Welcome to Back
          </h2>
          <p className="text-[#475467] text-[16px] mb-8">
            Enter your saved email and password
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#344054] mb-1.5">
                Email
              </label>
              <input
                type="email"
                placeholder="alexsmith@gmail.com"
                className="w-full px-3.5 py-2.5 bg-white border border-[#D0D5DD] rounded-lg shadow-[0_1px_2px_rgba(16,24,40,0.05)] focus:ring-2 focus:ring-[#7F56D9] focus:border-[#7F56D9] placeholder-[#667085]"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#344054] mb-1.5">
                Password
              </label>
              <input
                type="password"
                placeholder="*********"
                className="w-full px-3.5 py-2.5 bg-white border border-[#D0D5DD] rounded-lg shadow-[0_1px_2px_rgba(16,24,40,0.05)] focus:ring-2 focus:ring-[#7F56D9] focus:border-[#7F56D9] placeholder-[#667085]"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="mt-[10px] float-right">
              <a
                href="#"
                className=" text-[#7F56D9] hover:text-[#6941C6] font-semibold underline"
              >
                Forgot password
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#7F56D9] text-white py-2.5 px-4 rounded-lg hover:bg-[#6941C6] transition-colors font-semibold text-base shadow-[0_1px_2px_rgba(16,24,40,0.05)]"
            >
              Login
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center mt-6 text-[#475467]">
            Don't have a account ,{" "}
            <a
              href="/register"
              className="text-[#7F56D9] hover:text-[#6941C6] font-semibold"
            >
              Register
            </a>
          </p>

          {/* Footer Text */}
          <p className="text-center mt-8 text-sm text-[#475467] max-w-sm mx-auto leading-[20px]">
            If you're a Real Estate Agent and would like to start receiving
            leads now,{" "}
            <a
              // href="#"
              className="text-[#344054] hover:text-[#101828] font-semibold"
            >
              register here
            </a>{" "}
            to create your own agent profile, or visit our{" "}
            <a
              href="/HowItWorks"
              className="text-[#344054] hover:text-[#101828] font-semibold"
            >
              How It Works
            </a>{" "}
            page.
          </p>
        </div>
      </div>

      {/* Right Section - Decorative */}
      <div className="hidden lg:block w-1/2 bg-gradient-to-br from-[#F9F5FF] to-white relative overflow-hidden">
        <FormFooter label="Email address" />
      </div>
    </div>
  );
}

export default LogINForm;
