import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios.js";
import "./auth.css";

const Register = () => {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/auth/register', formData);
            navigate('/login')
        } catch (error) {
            setError(error.response?.data?.message || "Registration failed");
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Create an account</h2>
                <p className="auth-subtitle">Get started — it only takes a minute</p>

                {error && <div className="auth-error">{error}</div>}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-field">
                        <label htmlFor="reg-username">Username</label>
                        <input
                            type="text"
                            id="reg-username"
                            required
                            placeholder="Username"
                            name="username"
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="reg-email">Email</label>
                        <input
                            type="email"
                            id="reg-email"
                            required
                            placeholder="Email"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="reg-password">Password</label>
                        <input
                            type="password"
                            id="reg-password"
                            required
                            placeholder="Password"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button type="submit" className="auth-btn">Create account</button>
                </form>

                <p className="auth-footer">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    )

}

export default Register;