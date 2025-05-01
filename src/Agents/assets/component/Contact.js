import React from "react";

const Contact = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-2xl w-full">
       
        <div className="p-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-gray-600 mb-2">📧 Email: support@agentplatform.com</p>
          <p className="text-gray-600 mb-6">📞 Phone: +676 7767 676</p>
          <p className="text-gray-500 text-sm">
            We’re here to help! Feel free to reach out to us for any inquiries or support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
