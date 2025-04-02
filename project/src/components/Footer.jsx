import React from 'react';
import { NavLink } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-600 text-transparent bg-clip-text">PartyConnect</h3>
            <p className="text-gray-400">
              Connecting people through unforgettable events and experiences.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-200">Quick Links</h4>
            <ul className="space-y-2">
              <li><NavLink to="/about-us" className="text-gray-400 hover:text-purple-400">About Us</NavLink></li>
              <li><NavLink to="/how-it-works" className="text-gray-400 hover:text-purple-400">How It Works</NavLink></li>
              <li><NavLink to="/pricing" className="text-gray-400 hover:text-purple-400">Pricing</NavLink></li>
              <li><NavLink to="/contact" className="text-gray-400 hover:text-purple-400">Contact</NavLink></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-200">Support</h4>
            <ul className="space-y-2">
              <li><NavLink to="/help-center" className="text-gray-400 hover:text-purple-400">Help Center</NavLink></li>
              <li><NavLink to="/terms-of-service" className="text-gray-400 hover:text-purple-400">Terms of Service</NavLink></li>
              <li><NavLink to="/privacy-policy" className="text-gray-400 hover:text-purple-400">Privacy Policy</NavLink></li>
              <li><NavLink to="/faqs" className="text-gray-400 hover:text-purple-400">FAQs</NavLink></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-200">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400">
                <Youtube size={24} />
              </a>
            </div>
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-4 text-gray-200">Download Our App</h4>
              <div className="flex space-x-4">
                <button className="bg-neutral-900 text-gray-200 px-4 py-2 rounded-lg hover:bg-neutral-800">
                  App Store
                </button>
                <button className="bg-neutral-900 text-gray-200 px-4 py-2 rounded-lg hover:bg-neutral-800">
                  Google Play
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 PartyConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;