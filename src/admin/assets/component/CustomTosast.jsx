import React from 'react';
import toast from 'react-hot-toast';

const CustomToast = ({ message, onConfirm, onCancel, toastId, type = 'info' }) => {
  return (
    <div
      className={`${
        toastId ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
           
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">{message}</p>
            {type === 'logout' && (
              <p className="mt-1 text-sm text-gray-500">Are you sure you want to log out?</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        {/* Close Button */}
        <button
          onClick={() => toast.dismiss(toastId)} // Dismiss the toast when close button is clicked
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        {/* Confirm Button */}
        <button
          onClick={() => onConfirm(toastId)} // Confirm logout and dismiss toast
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          {type === 'logout' ? 'Logout' : 'OK'}
        </button>
      </div>
    </div>
  );
};

export default CustomToast;
