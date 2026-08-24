import React, { useState } from "react";
import { supabase } from "../../Supabase";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import image from "../../assets/image.png"
import "./Register.css";


function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setMessage("(Error): Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
          },
        },
      });

      if (error) throw error;

      const { data: dbData, error: dbError } = await supabase
        .from("register")
        .insert([{ name: formData.name, email: formData.email }])
        .select();

      if (dbError) throw dbError;

      console.log("Database Response:", dbData);
      setMessage("Registration Successful!");

    } catch (error) {
      setMessage("(Error): " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <div className="register-image-section">
          <img
            src={image}
            alt="Healthcare Registration"
            className="register-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = { image };
            }}
          />
        </div>

        <div className="register-form-section">
          <div className="register-header">
            <h2>Patient Register</h2>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Create Password</label>
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

            <div className="form-group">
              <label>Confirm Password</label>
              <div className="password-input-container">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-signup" disabled={loading}>
              {loading ? "Submitting..." : "Sign In"}
            </button>
          </form>

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

export default Register;