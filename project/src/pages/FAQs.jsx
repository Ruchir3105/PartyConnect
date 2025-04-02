// src/pages/FAQs.jsx
import React from 'react';

const FAQs = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions (FAQs)</h1>
        <ul className="text-gray-400 mt-4">
          <li><strong>Q: How do I create an event?</strong> <br /> A: Simply go to the "Create Event" section and fill out the details.</li>
          <li><strong>Q: How can I contact support?</strong> <br /> A: You can reach us via the "Contact" page or email support@partyconnect.com.</li>
          <li><strong>Q: Is PartyConnect free?</strong> <br /> A: Yes, PartyConnect is free to use, but we also offer premium features for an additional fee.</li>
        </ul>
      </div>
    </div>
  );
};

export default FAQs;
