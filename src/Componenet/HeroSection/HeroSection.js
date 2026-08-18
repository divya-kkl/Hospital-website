import React from "react";
import './HeroSection.css';
import { FaStar, FaMoon, FaSun, FaVideo, FaMicrophoneSlash, FaMicrophone, FaChevronDown } from "react-icons/fa";
import { TbGridDots } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";

import docter from "../../assets/doc.png"

function HeroSection(){
 return(
    <section className="hero-section">
      
        <div className="bg-shape bg-shape-1"></div>
        <div className="bg-shape bg-shape-2"></div>
        <div className="bg-shape bg-shape-3"></div>
        <div className="bg-shape bg-shape-4"></div>
        
        <div className="hero-container">
          
            <div className="hero-content">
                
                <div className="ratings-badge">
                    <div className="avatars">
                        <img src={docter} alt="doc1" className="avatar" />
                        <img src={docter} alt="doc2" className="avatar" />
                        <img src={docter} alt="doc3" className="avatar" />
                    </div>
                    <div className="ratings-info">
                        <span className="appointments-text">5K+ Appointments</span>
                        <div className="stars-row">
                            <FaStar className="star gold" />
                            <FaStar className="star gold" />
                            <FaStar className="star gold" />
                            <FaStar className="star gold" />
                            <FaStar className="star gold" />
                            <span className="rating-score">5.0 Ratings</span>
                        </div>
                    </div>
                </div>
                
                <h1 className="hero-title">
                    Discover Health: Find Your <br />
                    Trusted 
                    <span className="video-icon-badge">
                        <div className="bubble-back"></div>
                        <div className="bubble-front"><FaVideo /></div>
                    </span> 
                    Doctors Today
                </h1>

                <div className="search-container">
                    <div className="search-speciality">
                        <TbGridDots className="icon-grid" />
                        <span>Select Speciality</span>
                        <FaChevronDown className="icon-down" />
                    </div>
                    
                    <div className="search-divider"></div>

                    <div className="search-input">
                        <FiSearch className="icon search-icon" />
                        <input type="text" placeholder="Search for Medical Procedures, hospitals" />
                    </div>
                    
                    <button className="search-btn">Search</button>
                </div>
            </div>

   
            <div className="hero-image-section">
                <img src= {docter} alt="Doctor" className="doctor-image" />
                
               
                <div className="floating-controls-pill">
                    <button className="ctrl-btn"><FaVideo /></button>
                    <button className="ctrl-btn active-red"><FaMicrophoneSlash /></button>
                    <button className="ctrl-btn"><FaMicrophone /></button>
                </div>
            </div>
        </div>

       
        <div className="theme-toggle-pill">
            <button className="toggle-btn dark-mode"><FaMoon /></button>
            <button className="toggle-btn light-mode"><FaSun /></button>
        </div>
    </section>
 )
}
export default HeroSection;