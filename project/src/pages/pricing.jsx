// src/pages/Pricing.jsx
import React from 'react';

const Pricing = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-6">Pricing</h1>
        <p className="text-gray-400">
          We offer various pricing plans to fit your needs. Choose the plan that works best for you, whether you're hosting a small gathering or a large event.
        </p>
        <ul className="text-gray-400 mt-4">
          <li>Basic Plan: Free</li>
          <li>Premium Plan: $10/month</li>
          <li>Enterprise Plan: Custom pricing</li>
        </ul>
      </div>
    </div>
  );
};

export default Pricing;
