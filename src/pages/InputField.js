import React from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

function InputField({ label, type, name, value, onChange, error, showPassword, setShowPassword, placeholder }) {
  const handleKeyPress = (e) => {
    // Allow only numbers in phone number field
    if (name === "phoneNumber") {
      if (e.charCode < 48 || e.charCode > 57) {
        e.preventDefault(); // Prevent input if it's not a digit
      }
    }
    // Allow only letters and prevent digits in name fields
    if (name === "firstName" || name === "lastName") {
      if (e.charCode >= 48 && e.charCode <= 57) {
        e.preventDefault(); // Prevent input if it's a digit
      }
    }
  };

  return (
    <div>
      <label className="block font-medium">{label}</label>
      <div className="relative">
        <input 
          type={showPassword && (name === "password" || name === "confirmPassword") ? "text" : type} 
          name={name} 
          placeholder={placeholder || `Enter your ${label.toLowerCase()}`} 
          value={value} 
          onChange={onChange} 
          onKeyPress={handleKeyPress} // Add the onKeyPress handler
          className={`w-full p-3 border rounded-lg ${error ? 'border-red-500' : 'border-gray-300'}`}
          maxLength={name === "phoneNumber" ? 10 : undefined} 
        />
        {name === "password" || name === "confirmPassword" ? (
          <button type="button" className="absolute inset-y-0 right-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
          </button>
        ) : null}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

export default InputField;