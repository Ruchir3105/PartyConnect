import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, Menu, X, PartyPopper } from 'lucide-react';
// import { PartyPopper } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-black shadow-lg fixed w-full z-50 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Add PartyPopper icon with PartyConnect logo */}
            <div className="flex items-center space-x-2">
              <PartyPopper className="text-3xl text-purple-400" />
              <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-600 text-transparent bg-clip-text">
                PartyConnect
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search events..."
                className="w-64 pl-10 pr-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 focus:outline-none focus:border-purple-500 text-gray-200 placeholder-gray-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
            </div>
            <NavLink to="/" className="text-gray-300 hover:text-purple-400">Browse Events</NavLink>
            <NavLink to="/" className="text-gray-300 hover:text-purple-400">Create Event</NavLink>
            {/* Sign In button linking to the login page */}
            <NavLink to="/login" className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700">
              Sign In
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-purple-400"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-neutral-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="relative p-3">
              <input
                type="text"
                placeholder="Search events..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 focus:outline-none focus:border-purple-500 text-gray-200 placeholder-gray-500"
              />
              <Search className="absolute left-6 top-5 h-5 w-5 text-gray-500" />
            </div>
            <NavLink to="/" className="block px-3 py-2 text-gray-300 hover:text-purple-400">Browse Events</NavLink>
            <NavLink to="/" className="block px-3 py-2 text-gray-300 hover:text-purple-400">Create Event</NavLink>
            <NavLink to="/login" className="w-full mt-2 bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700">
              Sign In
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;