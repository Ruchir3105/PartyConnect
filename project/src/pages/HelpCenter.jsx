// src/pages/HelpCenter.jsx
import React from 'react';

const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-6">Help Center</h1>
        <p className="text-gray-400">
          Need help? Our Help Center provides answers to frequently asked questions, guides on how to use our platform, and more.
        </p>
        <ul className="text-gray-400 mt-4">
          <li>How to Create an Event</li>
          <li>How to Browse Events</li>
          <li>Account Management</li>
          <li>Payment & Billing</li>
        </ul>
      </div>
    </div>
  );
};

export default HelpCenter;
