import React from "react";

function PricingModel() {
  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = "/MultiStepForm";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-yellow-200 flex flex-col items-center py-12 px-4">
      {/* Logo Section */}
      <div className="w-full flex justify-start pl-8 mb-4">
        <img
          src="/images/findmyagent.svg"
          alt="FindMyAgent Logo"
          // className="w-[100px]"
        />
      </div>

      {/* Title */}
      <h2 className="text-[48px] font-bold text-black  mb-24">Pricing Model</h2>

      {/* Cards Section */}
      <div className="relative w-full max-w-[1200px] flex justify-center items-center gap-8 mb-20">
        {/* First Card */}
        <div className="w-[350px] h-[300px] bg-white rounded-[20px] p-8 border-[2px] border-[#7F56D9]">
          <h3 className="text-[24px] font-semibold mb-8">
            Monthly Subscription Fees
          </h3>
          <ol className="space-y-6 list-decimal list-inside">
            <li className="text-[16px] leading-relaxed">
              Agencies and additional agents pay monthly subscription fees
              ($1000)
            </li>
            <li className="text-[16px] leading-relaxed">
              Expected growth: Start with 50 agencies, growing to 200 agencies
              by Year 3.
            </li>
          </ol>
        </div>

        {/* Middle Card - Taller */}
        <div className="w-[350px] h-[380px] bg-gradient-to-br from-[#5F1BE3] to-[#560064] rounded-[20px] p-8 text-white">
          <h3 className="text-[24px] font-semibold mb-8">
            Monthly Subscription Fees
          </h3>
          <ol className="space-y-6 list-decimal list-inside">
            <li className="text-[16px] leading-relaxed">
              10% fee on agents commissions from closed deals
            </li>
            <li className="text-[16px] leading-relaxed">
              Average deal size: $500,000 with a 2% agent commission
            </li>
            <li className="text-[16px] leading-relaxed">
              Expected closed deals: 100 deals in Year 1, scaling to 500 by Year
              3.
            </li>
          </ol>
        </div>

        {/* Third Card */}
        <div className="w-[350px] h-[300px] bg-white rounded-[20px] p-8 border-[2px] border-[#7F56D9]">
          <h3 className="text-[24px] font-semibold mb-8">
            Monthly Subscription Fees
          </h3>
          <ol className="space-y-6 list-decimal list-inside">
            <li className="text-[16px] leading-relaxed">
              Revenue from premium features (e.g: advanced market analytics,
              exclusive listing).
            </li>
          </ol>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={handleSubmit}
        className="w-[400px] h-[40px] bg-[#8046F1] text-white rounded-[30px] font-semibold text-[18px]"
      >
        Let's Be Agent
      </button>
    </div>
  );
}

export default PricingModel;
