import React from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { clearAuthToken } from '../../reduxStore/auth/authSlice';
import toast, { Toaster } from 'react-hot-toast';
import CustomToast from './CustomTosast';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    // Show custom toast with confirmation options
    toast.custom((t) => (
      <CustomToast
        message="Confirm Logout"
        toastId={t.id}
        onConfirm={handleLogoutConfirm}
        onCancel={() => toast.dismiss(t.id)}
        type="logout"
      />
    ));
  };

  const handleLogoutConfirm = (toastId) => {
    // Remove token from Redux
    dispatch(clearAuthToken());

    // Remove token from cookies
    Cookies.remove('auth_token');

    // Show success toast
    toast.success('You have successfully logged out!');

    // Close the confirmation toast
    toast.dismiss(toastId);

    // Navigate to login page after a delay
    setTimeout(() => {
      navigate('/admin/login');
    }, 2000);
  };

  return (
    <div>
      <header className="bg-transparent text-white px-6 py-4 fixed top-0 left-0 w-full h-16 z-20 backdrop-blur-xl rounded-lg">
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded absolute right-10"
            onClick={handleLogoutClick} // Trigger custom logout toast
          >
            Logout
          </button>
        
        </div>
      </header>

      {/* Toast container */}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Header;
