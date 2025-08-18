import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BrowseEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Use navigate for routing

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/events/fetch');
                setEvents(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching events data:", error);
                setError('Failed to fetch events data');
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const isValidImageData = (imageData) => {
        return imageData &&
            typeof imageData === 'string' &&
            imageData.startsWith('data:') &&
            imageData.length > 100;
    };

    const handleRegisterClick = (eventId) => {
        // Navigate to the Registration page with eventId as state
        navigate('/register', { state: { eventId } });
    };

    const renderHeading = () => (
        <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-purple-500 tracking-tight sm:text-5xl">
                🎉 Browse Crazy Events Here!
            </h2>
            <p className="mt-2 text-gray-300 text-lg">
                Discover epic experiences and unforgettable moments near you.
            </p>
        </div>
    );

    if (loading) {
        return (
            <section className="py-16 bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {renderHeading()}
                    <div className="text-white text-center">Loading events...</div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-16 bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {renderHeading()}
                    <div className="text-red-500 text-center">{error}</div>
                </div>
            </section>
        );
    }

    return (
        <div className='bg-black'>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {renderHeading()}
                {events.length === 0 ? (
                    <div className="text-gray-400 text-center py-8">No events found</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {events.map((event) => (
                            <div key={event._id} className="bg-neutral-900 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow border border-neutral-800 group">
                                {/* Event Image */}
                                <div className="relative">
                                    {isValidImageData(event.eventImage?.data) ? (
                                        <img
                                            src={event.eventImage.data}
                                            alt={event.name}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-48 bg-neutral-800 flex items-center justify-center text-gray-400">
                                            No Image Available
                                        </div>
                                    )}
                                </div>

                                {/* Event Details */}
                                <div className="p-6">
                                    <h3 className="font-bold text-xl mb-2 text-white group-hover:text-purple-400 transition-colors">{event.name}</h3>

                                    <div className="space-y-2">
                                        <div className="flex items-center text-gray-400">
                                            <Calendar className="h-4 w-4 mr-2" />
                                            <span>{event.Date}</span>
                                        </div>

                                        <div className="flex items-center text-gray-400">
                                            <MapPin className="h-4 w-4 mr-2" />
                                            <span>{event.Venue}</span>
                                        </div>

                                        <div className="flex items-center text-gray-400">
                                            <span>{event.categories}</span>
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
                )}
            </div>
        </div>
    );
};

export default BrowseEvents;
