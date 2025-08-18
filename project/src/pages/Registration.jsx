import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.name) {
            setError('Name is required.');
            return;
        }

        if (formData.phone && !/^\+?[1-9]\d{1,14}$/.test(formData.phone)) {
            setError('Please enter a valid phone number.');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const res = await axios.post('http://localhost:8080/Registrations/add', formData);

            if (res.status === 200) {
                alert('Registration successful!');
                navigate("/");
            }

            // Reset form data after submission
            setFormData({
                name: '',
                phone: '',
            });
        } catch (err) {
            console.error(err);
            setError('Something went wrong while registering.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="bg-neutral-900 p-8 rounded-xl shadow-xl max-w-md w-full">
                <h2 className="text-2xl text-white font-semibold mb-6">Register</h2>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="mb-4">
                        <label className="block text-gray-200 mb-2" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-neutral-800 text-white focus:outline-none focus:border-purple-500"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div className="mb-4">
                        <label className="block text-gray-200 mb-2" htmlFor="phone">Phone Number</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-neutral-800 text-white focus:outline-none focus:border-purple-500"
                            placeholder="Enter your phone number (optional)"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Registration;
