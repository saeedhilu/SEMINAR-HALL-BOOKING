import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../Axios';

const Login = ({onSuccess}) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await instance.post('login/', formData);
            
            if (response.status === 200) {
                onSuccess();
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
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Sign in</h1>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
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
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Sign In</button>
            <div className="text-center mt-4">
                <button onClick={() => navigate('/signup')} className="bg-white text-blue-500 px-4 py-2 rounded-full mr-2">Sign Up</button>
            </div>
        </form>
    );
};

export default Login;