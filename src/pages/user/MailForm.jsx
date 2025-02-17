import { GoogleLogin } from "@react-oauth/google";

const MailForm = () => {
  return (
    <div className="text-center">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      <p className="text-sm text-gray-600 mt-2">
        By clicking this you accept our
        <a href="/privacy-policy" className="text-blue-500 hover:underline">
          {" "}
          privacy policy{" "}
        </a>
        and
        <a href="/terms-of-use" className="text-blue-500 hover:underline">
          {" "}
          terms of use
        </a>
        .
      </p>
    </div>
  );
};

export default MailForm;
