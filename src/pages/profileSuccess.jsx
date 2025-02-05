import React from "react";
import SuccessMessage from "../components/success-message";

const ProfileSuccessPage = () => {
  const singleButtonConfig = {
    message: "Your profile has been created",
    buttons: [
      {
        label: "Go to Dashboard",
        onClick: () => (window.location.href = "/"),
      },
    ],
  };

  return <SuccessMessage {...singleButtonConfig} />;
};

export default ProfileSuccessPage;
