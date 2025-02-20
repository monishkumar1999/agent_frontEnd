import React from "react";

function InputField({ label, type, name, value, onChange, error, placeholder }) {
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
          type={type} 
          name={name} 
          placeholder={placeholder || `Enter your ${label.toLowerCase()}`} 
          value={value} 
          onChange={onChange} 
          onKeyPress={handleKeyPress} // Add the onKeyPress handler
          className={`w-full p-3 border rounded-lg ${error ? 'border-red-500' : 'border-gray-300'}`}
          maxLength={name === "phoneNumber" ? 10 : undefined} 
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

export default InputField;
