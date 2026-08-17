import React, { useState } from "react";
import './Header.css';
import { FaChevronDown, FaUser, FaBars, FaTimes, FaChevronRight, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { TbGridDots, TbMessageFilled } from "react-icons/tb";
import { RiPhoneFill } from "react-icons/ri";
import log from "../../assets/log.png";

function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return(
        <header className="main-header">
            <div className="container">
                <div className="navbar">
                    {/* Logo Section */}
                    <div className="logo">
                        <img src= { log } alt="DOCCURE" />
                    </div>

                    {/* Navigation Menu */}
                    <nav className="nav-menu">
                        <ul>
                            <li className="active"><a href="#">Home <FaChevronDown className="arrow" /></a></li>
                            <li><a href="#">Doctors <FaChevronDown className="arrow" /></a></li>
                            <li><a href="#">Patients <FaChevronDown className="arrow" /></a></li>
                            <li><a href="#">Pharmacy <FaChevronDown className="arrow" /></a></li>
                            <li><a href="#">Pages <FaChevronDown className="arrow" /></a></li>
                            <li><a href="#">Blog <FaChevronDown className="arrow" /></a></li>
                            <li><a href="#">Admin <FaChevronDown className="arrow" /></a></li>
                        </ul>
                    </nav>

                    {/* Action Buttons */}
                    <div className="nav-actions">
                        <a href="#" className="btn btn-signup">
                            <FaUser className="btn-icon" /> Sign Up
                        </a>
                        <a href="#" className="btn btn-register">
                            <FaUser className="btn-icon" /> Register
                        </a>
                        <button className="btn-grid">
                            <TbGridDots />
                        </button>
                        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
                            <FaBars />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer Menu */}
            <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}></div>
            <div className={`mobile-menu-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
                <div className="drawer-header">
                    <img src={log} alt="DOCCURE" className="drawer-logo" />
                    <button className="drawer-close-btn" onClick={toggleMobileMenu}>
                        <FaTimes />
                    </button>
                </div>
                
                <div className="drawer-nav">
                    <ul>
                        <li><a href="#"><span>Home</span> <FaChevronRight className="drawer-arrow" /></a></li>
                        <li><a href="#"><span>Doctors</span> <FaChevronRight className="drawer-arrow" /></a></li>
                        <li><a href="#"><span>Patients</span> <FaChevronRight className="drawer-arrow" /></a></li>
                        <li><a href="#"><span>Pharmacy</span> <FaChevronRight className="drawer-arrow" /></a></li>
                        <li><a href="#"><span>Pages</span> <FaChevronRight className="drawer-arrow" /></a></li>
                        <li><a href="#"><span>Blog</span> <FaChevronRight className="drawer-arrow" /></a></li>
                        <li><a href="#"><span>Admin</span> <FaChevronRight className="drawer-arrow" /></a></li>
                    </ul>
                </div>

                <div className="drawer-contact">
                    <h3>Contact Information</h3>
                    <div className="contact-item">
                        <div className="contact-icon"><TbMessageFilled /></div>
                        <div className="contact-info">
                            <span className="contact-label">General Inquiries</span>
                            <span className="contact-value">info@example.com</span>
                        </div>
                    </div>
                    <div className="contact-item">
                        <div className="contact-icon"><RiPhoneFill /></div>
                        <div className="contact-info">
                            <span className="contact-label">Emergency Cases</span>
                            <span className="contact-value">+1 24565 89856</span>
                        </div>
                    </div>
                </div>

                <div className="drawer-social">
                    <h3>Follow Us</h3>
                    <div className="social-icons-drawer">
                        <a href="#"><FaFacebookF /></a>
                        <a href="#"><FaXTwitter /></a>
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><FaLinkedinIn /></a>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header;