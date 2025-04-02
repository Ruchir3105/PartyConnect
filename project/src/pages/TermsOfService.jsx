// src/pages/TermsOfService.jsx
import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
        <p className="text-gray-400">
          Please read our Terms of Service carefully. By using PartyConnect, you agree to abide by these terms.
        </p>
        <p className="text-gray-400 mt-4">
          1. Users must be at least 18 years old to create an account. <br />
          2. All events must comply with local laws and regulations. <br />
          3. We reserve the right to remove inappropriate content and ban users who violate the terms.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
