import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../Supabase";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import log from "../../assets/log.png";
import './AdminLogin.css';

function AdminLogin() {
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
            navigate('/admin-dashboard');

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-card">
                <div className="admin-login-header">
                    <img src={log} alt="DOCCURE" className="admin-logo" />
                    <h2>Admin Sign In</h2>
                    <p>Sign in to access your dashboard</p>
                </div>

                <form className="admin-login-form" onSubmit={handleSubmit}>
                    <div className="admin-form-group">
                        <label>Email Address</label>
                        <div className="admin-input-wrapper">
                            <FaEnvelope className="admin-input-icon" />
                            <input
                                type="email"
                                placeholder="Enter admin email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="admin-form-group">
                        <label>Password</label>
                        <div className="admin-input-wrapper">
                            <FaLock className="admin-input-icon" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="admin-password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {error && <div className="admin-error-message">{error}</div>}

                    <div className="admin-form-actions">
                        <div className="admin-remember-me">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                    </div>

                    <button type="submit" className="admin-login-btn" disabled={loading}>
                        {loading ? "Processing..." : "Sign In"}
                    </button>
                </form>

                <div style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#757575" }}>
                    Don't have an account? 
                    <Link to="/admin-register" style={{ color: "#0b60f5", fontWeight: "600", cursor: "pointer", textDecoration: "none", marginLeft: "5px" }}>
                        Sign Up here
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default AdminLogin;
