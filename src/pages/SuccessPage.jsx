import React from "react";
import SuccessMessage from "../components/success-message";

const SuccessPage = () => {
  const twoButtonsConfig = {
    message: "Account created successfully",
    buttons: [
      {
        label: "See the Pricing Model",
        onClick: () => (window.location.href = "/PricingModel"),
      },
      {
        label: "Let's Be Agent",
        variant: "outline",
        onClick: () => (window.location.href = "/MultiStepForm"),
      },
    ],
  };

  return <SuccessMessage {...twoButtonsConfig} />;
};

export default SuccessPage;
