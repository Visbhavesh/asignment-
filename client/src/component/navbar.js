import React from 'react';
import { useNavigate } from 'react-router-dom';
// import jwtDecode from 'jwt-decode';

const Navbar = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accesstoken');

  const handleLogout = () => {
    localStorage.removeItem('accesstoken');
    navigate('/signin'); // Redirect to the login page
  };


let email=localStorage.getItem('email');

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div>
        <h1 className="text-lg font-bold">User Dashboard</h1>
      </div>
      <div className="flex items-center relative">
        {accessToken && email && (
          <div className="relative group">
            <span className="mr-4 cursor-pointer">{email.slice(0,5)}...</span>
            <span className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2">
              {email}
            </span>
          </div>
        )}
        <button 
          onClick={handleLogout} 
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-700">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
