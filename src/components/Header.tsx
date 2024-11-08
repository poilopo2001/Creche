import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Menu, X, LogIn } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulated login state

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn); // Toggle login state for demonstration
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-indigo-600">DayCareConnect</Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/search" className="text-gray-600 hover:text-indigo-600 transition duration-300">Find Daycare</Link>
            <Link to="/blog" className="text-gray-600 hover:text-indigo-600 transition duration-300">Blog</Link>
            <Link to="/parenting-tips" className="text-gray-600 hover:text-indigo-600 transition duration-300">Parenting Tips</Link>
            <Link to="/about" className="text-gray-600 hover:text-indigo-600 transition duration-300">About Us</Link>
            <Link to="/contact" className="text-gray-600 hover:text-indigo-600 transition duration-300">Contact</Link>
            <Link to="/faq" className="text-gray-600 hover:text-indigo-600 transition duration-300">FAQ</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/search" className="btn btn-primary hidden md:flex">
              <Search size={20} className="mr-2" />
              <span>Search</span>
            </Link>
            {isLoggedIn ? (
              <Link to="/dashboard" className="p-2 rounded-full hover:bg-gray-100 transition duration-300">
                <User size={24} className="text-indigo-600" />
              </Link>
            ) : (
              <div className="flex items-center space-x-2">
                <button onClick={handleLogin} className="btn btn-secondary flex items-center">
                  <LogIn size={20} className="mr-2" />
                  <span>Login</span>
                </button>
                <Link to="/daycare-login" className="text-indigo-600 hover:text-indigo-800 transition duration-300">
                  Daycare Login
                </Link>
              </div>
            )}
            <button className="p-2 rounded-full hover:bg-gray-100 transition duration-300 md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} className="text-gray-600" /> : <Menu size={24} className="text-gray-600" />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/search" className="text-gray-600 hover:text-indigo-600 transition duration-300" onClick={toggleMenu}>Find Daycare</Link>
              <Link to="/blog" className="text-gray-600 hover:text-indigo-600 transition duration-300" onClick={toggleMenu}>Blog</Link>
              <Link to="/parenting-tips" className="text-gray-600 hover:text-indigo-600 transition duration-300" onClick={toggleMenu}>Parenting Tips</Link>
              <Link to="/about" className="text-gray-600 hover:text-indigo-600 transition duration-300" onClick={toggleMenu}>About Us</Link>
              <Link to="/contact" className="text-gray-600 hover:text-indigo-600 transition duration-300" onClick={toggleMenu}>Contact</Link>
              <Link to="/faq" className="text-gray-600 hover:text-indigo-600 transition duration-300" onClick={toggleMenu}>FAQ</Link>
              <Link to="/daycare-login" className="text-indigo-600 hover:text-indigo-800 transition duration-300" onClick={toggleMenu}>Daycare Login</Link>
              <Link to="/daycare-signup" className="text-indigo-600 hover:text-indigo-800 transition duration-300" onClick={toggleMenu}>Daycare Signup</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;