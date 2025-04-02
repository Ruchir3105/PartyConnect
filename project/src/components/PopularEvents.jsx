import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';

const events = [
  {
    id: 1,
    title: "Summer Music Festival 2024",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80",
    date: "Jun 15, 2024",
    location: "Central Park, NY",
    price: "$49",
    attendees: 1200
  },
  {
    id: 2,
    title: "Food & Wine Expo",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80",
    date: "May 20, 2024",
    location: "Convention Center",
    price: "$35",
    attendees: 800
  },
  {
    id: 3,
    title: "Tech Conference 2024",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80",
    date: "Jul 10, 2024",
    location: "Tech Hub",
    price: "$99",
    attendees: 1500
  },
  {
    id: 4,
    title: "Art Gallery Opening",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80",
    date: "Apr 25, 2024",
    location: "Modern Art Museum",
    price: "$25",
    attendees: 400
  }
];

const PopularEvents = () => {
  return (
    <section className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-12 text-white">Popular Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {events.map((event) => (
            <div key={event.id} className="bg-neutral-900 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow border border-neutral-800 group">
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-purple-600 px-3 py-1 rounded-full text-white font-semibold">
                  {event.price}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-white group-hover:text-purple-400 transition-colors">{event.title}</h3>
                
                <div className="space-y-2">
                  <div className="flex items-center text-gray-400">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{event.date}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-400">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-400">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>
                
                <button className="mt-6 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  Get Tickets
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularEvents;