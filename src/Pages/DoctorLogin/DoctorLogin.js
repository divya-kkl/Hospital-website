import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../Supabase";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import log from "../../assets/log.png";
import './DoctorLogin.css';

function DoctorLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) throw error;
            navigate('/doctor-dashboard');

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="doctor-login-container">
            <div className="doctor-login-card">
                <div className="doctor-login-header">
                    <img src={log} alt="DOCCURE" className="doctor-logo" />
                    <h2>Doctor Sign In</h2>
                    <p>Sign in to access your dashboard</p>
                </div>

                <form className="doctor-login-form" onSubmit={handleSubmit}>
                    <div className="doctor-form-group">
                        <label>Email Address</label>
                        <div className="doctor-input-wrapper">
                            <FaEnvelope className="doctor-input-icon" />
                            <input
                                type="email"
                                placeholder="Enter doctor email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="doctor-form-group">
                        <label>Password</label>
                        <div className="doctor-input-wrapper">
                            <FaLock className="doctor-input-icon" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="doctor-password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {error && <div className="doctor-error-message">{error}</div>}

                    <div className="doctor-form-actions">
                        <div className="doctor-remember-me">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                    </div>

                    <button type="submit" className="doctor-login-btn" disabled={loading}>
                        {loading ? "Processing..." : "Sign In"}
                    </button>
                </form>


            </div>
        </div>
    );
}

export default DoctorLogin;
