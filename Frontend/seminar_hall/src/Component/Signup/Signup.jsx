import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../Axios';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', confirm_password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await instance.post('signup/', formData);
            if (response.status === 201) {
                navigate('/login');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(Object.values(error.response.data).flat().join(' '));
            } else {
                setError('An error occurred');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="signup-form">
            <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border rounded-md"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border rounded-md"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border rounded-md"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                    type="password"
                    id="confirm_password"
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border rounded-md"
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Sign Up</button>
            <div className="text-center mt-4">
                <button type="button" onClick={() => navigate('/login')} className="bg-white text-blue-500 px-4 py-2 rounded-full mr-2">Sign In</button>
            </div>
        </form>
    );
};

export default Signup;