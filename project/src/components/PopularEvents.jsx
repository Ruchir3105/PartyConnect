import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const PopularEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch events from the database
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/events/popular');
        setEvents(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Error loading events');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleRegisterClick = (eventId) => {
    // Navigate to /register with eventId passed as state
    navigate('/register', { state: { eventId } });
  };

  if (loading) {
    return (
      <div className="py-16 bg-black text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-white">Popular Events</h2>
          <p>Loading events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-white">Popular Events</h2>
          <p className="text-red-500 text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-12 text-white">Popular Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-neutral-900 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow border border-neutral-800 group"
            >
              {/* Event Image */}
              <div className="relative">
                <img
                  src={event.eventImage?.data || 'https://via.placeholder.com/400x200?text=No+Image'}
                  alt={event.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Event Details */}
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-white group-hover:text-purple-400 transition-colors">
                  {event.name}
                </h3>

                <div className="space-y-2">
                  <div className="flex items-center text-gray-400">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{event.Date}</span>
                  </div>

                  <div className="flex items-center text-gray-400">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.Venue}</span>
                  </div>
                </div>

                {/* Register Button */}
                <button
                  onClick={() => handleRegisterClick(event._id)} // Pass event ID
                  className="mt-6 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Register Here
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
