import React from 'react';


const Hero = () => {
  return (
    <div
      className="relative pt-16 w-full h-[780px] rounded-b-3xl flex items-center justify-center"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // filter: 'brightness(0.5)', // REMOVE THIS LINE!
      }}
    >
      {/* Overlay to darken the image (for better text contrast) */}
      <div className="absolute inset-0 bg-black/50 rounded-b-3xl"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white mb-8">
          <span className="flex justify-center items-center mb-4">
            <span>Connect, Celebrate, Create Memories</span>
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl mx-auto px-6 py-4 bg-black/60 rounded-lg shadow-lg backdrop-blur-sm typing-effect">
          Discover amazing events happening around you or create your own!
        </p>
      </div>
    </div>
  );
};

export default Hero;
