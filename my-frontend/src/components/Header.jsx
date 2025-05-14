import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

  const logout = () => {
    
    localStorage.removeItem('token');
    
    
    navigate('/auth');
  };

return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
            <ul className="flex space-x-6">
            <li>
                <Link to="/" className="hover:text-gray-400">
                  Home
                </Link>
              </li>
              </ul>
        </h1>
        <nav>
          <ul className="flex space-x-6">
            {token && (
              <li>
                <Link to="/products" className="hover:text-gray-400">
                  Products
                </Link>
              </li>
            )}

          
            {token && (
              <li>
                <Link to="/profile" className="hover:text-gray-400">
                  My Profile
                </Link>
              </li>
            )}

            
            <li>
              <Link to="/auth" className="hover:text-gray-400">
                Login/Register
              </Link>
            </li>

            
            {token && (
              <li>
                <button
                  onClick={logout}
                  className="text-red-500 hover:text-red-400"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
