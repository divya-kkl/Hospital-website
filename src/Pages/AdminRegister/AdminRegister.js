import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../Supabase";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import log from "../../assets/log.png";
import './AdminRegister.css';

function AdminRegister() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccessMessage("");

        try {
            if (password !== confirmPassword) {
                throw new Error("Passwords do not match!");
            }

            const { error: authError } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        full_name: name,
                        role: 'admin'
                    }
                }
            });

            if (authError) throw authError;

            const { error: dbError } = await supabase
                .from('admin_users')
                .insert([{
                    name: name,
                    email: email,
                    role: 'admin'
                }]);

            if (dbError) throw dbError;
            setSuccessMessage("Admin Account Created Successfully! Please Sign In.");
            setTimeout(() => {
                navigate('/admin-login');
            }, 2000);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-register-container">
            <div className="admin-register-card">
                <div className="admin-register-header">
                    <img src={log} alt="DOCCURE" className="admin-logo" />
                    <h2>Admin Sign Up</h2>
                    <p>Create a new hospital admin account</p>
                </div>

                <form className="admin-register-form" onSubmit={handleSubmit}>
                    <div className="admin-form-group">
                        <label>Full Name</label>
                        <div className="admin-input-wrapper">
                            <FaUser className="admin-input-icon" />
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

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

                    <div className="admin-form-group">
                        <label>Confirm Password</label>
                        <div className="admin-input-wrapper">
                            <FaLock className="admin-input-icon" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {error && <div className="admin-error-message">{error}</div>}
                    {successMessage && <div className="admin-error-message" style={{ background: "#e8f5e9", color: "#2e7d32", borderColor: "#c8e6c9" }}>{successMessage}</div>}

                    <button type="submit" className="admin-register-btn" disabled={loading}>
                        {loading ? "Processing..." : "Sign Up"}
                    </button>
                </form>

                <div style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#757575" }}>
                    Already have an account? 
                    <Link to="/admin-login" style={{ color: "#0b60f5", fontWeight: "600", cursor: "pointer", textDecoration: "none", marginLeft: "5px" }}>
                        Sign In here
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AdminRegister;
