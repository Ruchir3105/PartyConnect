import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative pt-16">
      {/* Increased the height of the background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80"
          alt="Hero background"
          className="w-full h-[780px] object-cover brightness-[0.50] rounded-b-3xl" // Set height to screen size
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-48 pb-48">  {/* Increased padding to add space */}
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white mb-8"> {/* Increased font size */}
            <span className="flex justify-center items-center mb-4">
              <span>Connect, Celebrate, Create Memories</span>
            </span>
          </h1>
          
          {/* Increased paragraph font size and spacing */}
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto px-6 py-4 bg-black/60 rounded-lg shadow-lg backdrop-blur-sm typing-effect">
            Discover amazing events happening around you or create your own!
          </p>

          {/* Form container with increased padding */}
          <div className="max-w-3xl mx-auto bg-black/70 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-neutral-800">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search events..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-neutral-900 border border-neutral-800 focus:outline-none focus:border-purple-500 text-gray-200 placeholder-gray-500"
                />
                <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
              </div>
              
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-neutral-900 border border-neutral-800 focus:outline-none focus:border-purple-500 text-gray-200 placeholder-gray-500"
                />
                <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
              </div>
              
              <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors">
                Find Events
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
