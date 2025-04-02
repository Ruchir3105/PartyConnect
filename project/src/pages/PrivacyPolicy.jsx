// src/pages/PrivacyPolicy.jsx
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-gray-400">
          We take your privacy seriously. This policy explains how we collect, use, and protect your data.
        </p>
        <ul className="text-gray-400 mt-4">
          <li>We collect personal information when you sign up.</li>
          <li>Your data is stored securely and is not shared with third parties without consent.</li>
          <li>You can request to delete your account and data at any time.</li>
        </ul>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
