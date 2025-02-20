import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'; // Import the updated CSS file

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:9090/api/login', { email, password });
            const userData = response.data;

            if (userData && userData.roles) {
                localStorage.setItem('user', JSON.stringify(userData));
                const roles = userData.roles.map(role => role.authority);
                if (roles.includes('DOCTOR')) {
                    navigate('/doctor-dashboard');
                } else if (roles.includes('PATIENT')) {
                    navigate('/patient-dashboard');
                } else if (roles.includes('ADMIN')) {
                    navigate('/admin-dashboard');
                } else {
                    navigate('/');
                }
            } else {
                alert('Login failed. Roles are missing.');
            }
        } catch (error) {
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-left">
                <div className="login-card">
                    <h3 className="login-title">Login</h3>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                id="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary w-100">Login</button>
                        </div>
                    </form>
                    <div className="text-center mt-3">
                        <p>
                            Don't have an account? <a href="/signup" className="text-primary">Sign Up</a>
                        </p>
                    </div>
                </div>
            </div>
            <div className="login-right">
                {/* Add a background medical image */}
            </div>
        </div>
    );
};

export default Login;
