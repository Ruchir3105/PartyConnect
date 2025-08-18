import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SportsPage = () => {
  const [sportsEvents, setSportsEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch sports events from the API
    const fetchSportsEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/events/sports');
        setSportsEvents(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching sports events');
        setLoading(false);
      }
    };

    fetchSportsEvents();
  }, []);
  const handleRegisterClick = (eventId) => {
    // Navigate to /register and pass eventId as state
    navigate('/register', { state: { eventId } });
  };

  if (loading) {
    return (
      <div className="text-white">Loading sports events...</div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500">{error}</div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-bold mb-8">Sports Events</h1>
      <p className="text-lg mb-4">Join the best sports events, competitions, and activities around you!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {sportsEvents.map(event => (
          <div key={event._id} className="bg-neutral-900 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div className="relative">
              {event.eventImage?.data ? (
                <img
                  src={event.eventImage.data}
                  alt={event.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => e.target.style.display = "none"} // Hide image if it fails to load
                />
              ) : (
                <div className="w-full h-48 bg-neutral-800 flex items-center justify-center text-gray-400">
                  No Image Available
                </div>
              )}
            </div>

            <div className="p-6">
              <h3 className="font-bold text-xl mb-2">{event.name}</h3>
              <p className="text-gray-400">{event.Date}</p>
              <p className="text-gray-400">{event.Venue}</p>
              <p className="text-gray-400">{event.categories}</p> {/* Display category */}
              <button onClick={() => handleRegisterClick(event._id)} className="mt-6 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Register Here
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SportsPage;
