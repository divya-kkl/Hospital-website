import React, { useState } from "react";
import { supabase } from "../../Supabase";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import image from "../../assets/image.png";
import "./PatientLogin.css";

function PatientLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      setMessage("Login Successful!");
      
      // Redirect based on role
      if (data.user?.user_metadata?.role === 'admin') {
          setTimeout(() => navigate("/admin-dashboard"), 1000);
      } else if (data.user?.user_metadata?.role === 'doctor') {
          setTimeout(() => navigate("/doctor-dashboard"), 1000);
      } else {
          setTimeout(() => navigate("/profile"), 1000);
      }

    } catch (error) {
      setMessage("(Error): " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="patient-login-container">
      <div className="patient-login-content">
        <div className="patient-login-image-section">
          <img
            src={image}
            alt="Healthcare Login"
            className="patient-login-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = { image };
            }}
          />
        </div>

        <div className="patient-login-form-section">
          <div className="patient-login-header">
            <h2>Patient Login</h2>
          </div>

          <form className="patient-login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-signin" disabled={loading}>
              {loading ? "Authenticating..." : "Sign In"}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <p style={{ color: "#555", fontSize: "14px" }}>
              Don't have an account?{" "}
              <span 
                style={{ color: "#3498db", fontWeight: "bold", cursor: "pointer", textDecoration: "underline" }} 
                onClick={() => navigate("/register")}
              >
                Sign Up
              </span>
            </p>
          </div>

          {message && (
            <p className={message.includes("Error") ? "error-message" : "success-message"}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PatientLogin;
