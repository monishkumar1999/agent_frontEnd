import React, { useState } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import FormFooter from "../components/FormFooter";

function OTPVerificationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    otp: ["", "", "", ""],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = "/ConfirmPassword";
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex">
      {/* Left Section */}
      <div className="flex-1 p-8 lg:p-12">
        <div className="max-w-[420px] mx-auto">
          {/* Logo */}
          <h1 className="text-[22px] font-bold text-[#7F56D9] mb-12">
            FindMyAgent
          </h1>

          {/* Back Button */}
          <button className="flex items-center text-[#475467] mb-8">
            <ArrowLeft className="w-5 h-5 mr-2" />
          </button>

          {/* Form Header */}
          <h2 className="text-[30px] font-semibold text-[#101828] mb-2">
            OPT Verification
          </h2>
          <p className="text-[#475467] text-[16px] mb-8">
            We send 4 digit code at 880+ 0172578798070
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#344054] mb-1.5">
                Enter OTP
              </label>
              <div className="flex space-x-2">
                {formData.otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    className="w-12 h-12 text-center px-2 py-1 bg-white border border-[#D0D5DD] rounded-lg shadow-[0_1px_2px_rgba(16,24,40,0.05)] focus:ring-2 focus:ring-[#7F56D9] focus:border-[#7F56D9] placeholder-[#667085] text-lg"
                    value={digit}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d$/.test(value) || value === "") {
                        const otpArray = [...formData.otp];
                        otpArray[index] = value;
                        setFormData({ ...formData, otp: otpArray });

                        // Automatically focus on the next input box
                        if (value && e.target.nextSibling) {
                          e.target.nextSibling.focus();
                        }
                      }
                    }}
                    onKeyDown={(e) => {
                      if (
                        e.key === "Backspace" &&
                        !e.target.value &&
                        e.target.previousSibling
                      ) {
                        e.target.previousSibling.focus();
                      }
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-[10px] ">
              <a
                href="#"
                className=" text-[#7F56D9] hover:text-[#6941C6] font-semibold underline"
              >
                Resend the Code
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#7F56D9] text-white py-2.5 px-4 rounded-3xl hover:bg-[#6941C6] transition-colors font-semibold text-base shadow-[0_1px_2px_rgba(16,24,40,0.05)]"
            >
              Continue
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-[#475467] max-w-sm mx-auto leading-[20px]">
            If you're a Real Estate Agent and would like to start receiving
            leads now,{" "}
            <a
              href="#"
              className="text-[#344054] hover:text-[#101828] font-semibold"
            >
              register here
            </a>{" "}
            to create your own agent profile, or visit our{" "}
            <a
              href="#"
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
        <FormFooter label="OTP" />
      </div>
    </div>
  );
}

export default OTPVerificationForm;
