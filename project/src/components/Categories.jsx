import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Music, Theater, Utensils, Palette, Gamepad2, Dumbbell, Camera, Microscope as Microphone, Book, Film } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  { icon: Music, name: 'Music', color: 'bg-neutral-900 text-white', link:'/music' },
  { icon: Theater, name: 'Theater', color: 'bg-neutral-900 text-white', link:'/theater' },
  { icon: Utensils, name: 'Food & Drink', color: 'bg-neutral-900 text-white', link:'/food-and-drink' },
  { icon: Palette, name: 'Arts', color: 'bg-neutral-900 text-white', link:'/arts' },
  { icon: Gamepad2, name: 'Gaming', color: 'bg-neutral-900 text-white', link:'/gaming' },
  { icon: Dumbbell, name: 'Sports', color: 'bg-neutral-900 text-white', link:'/sports' },
  { icon: Camera, name: 'Photography', color: 'bg-neutral-900 text-white', link:'/photgraphy' },
  { icon: Microphone, name: 'Comedy', color: 'bg-neutral-900 text-white', link:'/comedy' },
  { icon: Book, name: 'Education', color: 'bg-neutral-900 text-white', link:'/education' },
  { icon: Film, name: 'Cinema', color: 'bg-neutral-900 text-white', link:'/cinema' },
];

const Categories = () => {
  const containerRef = useRef(null);

  return (
    <section className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-center mb-16 py-4 
        animate__animated animate__fadeIn">
          Browse by Category
        </h2>
        
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />
          
          <motion.div
            ref={containerRef}
            className="flex space-x-6 py-4"
            animate={{
              x: [0, -1920],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 50,
                ease: "linear",
              },
            }}
          >
            {[...categories, ...categories].map((category, index) => (
              <div
                key={index}
                className="flex-none w-48"
              >
                <div className="flex flex-col items-center p-6 rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer border border-neutral-800 bg-neutral-900 group">
                  <div className={`p-4 rounded-full ${category.color} mb-4 group-hover:scale-110 transition-transform`}>
                    <category.icon size={24} className="group-hover:text-purple-400 transition-colors" />
                  </div>
                  <span className="text-gray-200 font-medium group-hover:text-purple-400 transition-colors">{category.name}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Categories;