import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        Date: '',
        Venue: '',
        eventImage: null,
        categories: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Predefined categories for the dropdown
    const eventCategories = [
        'sports',
        'arts',
        'cinema',
        'comedy',
        'education',
        'fooddrink',
        'gaming',
        'music',
        'photography',
        'theatre'
    ];

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle file input
    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, eventImage: e.target.files[0] }));
    };

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.name ||!formData.Date || !formData.Venue || !formData.eventImage || !formData.categories) {
            setError('Please fill in all fields.');
            return;
        }

        setError('');
        setLoading(true);

        // Prepare data
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });

        try {
            const res = await axios.post('http://localhost:8080/events/add', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (res.status === 200) {
                alert('Event created successfully!');
                navigate("/browse-events");
            }

            // Reset form data after submission
            setFormData({
                name: '',
                Date: '',
                Venue: '',
                eventImage: null,
                categories: ''
            });

        } catch (err) {
            console.error(err);
            setError('Something went wrong while creating the event.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="bg-neutral-900 p-8 rounded-xl shadow-xl max-w-md w-full">
                <h2 className="text-2xl text-white font-semibold mb-6">Create Event</h2>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <form onSubmit={handleSubmit}>
                    {/* Event Name */}
                    <div className="mb-4">
                        <label className="block text-gray-200 mb-2" htmlFor="name">Event Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-neutral-800 text-white focus:outline-none focus:border-purple-500"
                            placeholder="Enter event name"
                            required
                        />
                    </div>
                    {/* Event Date */}
                    <div className="mb-4">
                        <label className="block text-gray-200 mb-2" htmlFor="Date">Event Date</label>
                        <input
                            type="date"
                            id="Date"
                            name="Date"
                            value={formData.Date}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-neutral-800 text-white focus:outline-none focus:border-purple-500"
                            required
                        />
                    </div>

                    {/* Venue */}
                    <div className="mb-4">
                        <label className="block text-gray-200 mb-2" htmlFor="Venue">Venue</label>
                        <input
                            type="text"
                            id="Venue"
                            name="Venue"
                            value={formData.Venue}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-neutral-800 text-white focus:outline-none focus:border-purple-500"
                            placeholder="Enter venue"
                            required
                        />
                    </div>

                    {/* Categories Dropdown */}
                    <div className="mb-4">
                        <label className="block text-gray-200 mb-2" htmlFor="categories">Category</label>
                        <select
                            id="categories"
                            name="categories"
                            value={formData.categories}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-neutral-800 text-white focus:outline-none focus:border-purple-500"
                            required
                        >
                            <option value="">Select a category</option>
                            {eventCategories.map((category) => (
                                <option key={category} value={category}>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Event Image */}
                    <div className="mb-6">
                        <label className="block text-gray-200 mb-2" htmlFor="eventImage">Event Image</label>
                        <input
                            type="file"
                            id="eventImage"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full p-2 bg-neutral-800 text-gray-200 rounded-lg focus:outline-none"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Creating Event...' : 'Create Event'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateEvent;
