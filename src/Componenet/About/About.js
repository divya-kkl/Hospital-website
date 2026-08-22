import React, { useState } from "react";
import "./About.css";
import { FaPlus, FaMinus } from "react-icons/fa";
import img1 from "../../assets/About1.jpg";
import img2 from "../../assets/About2.jpg";
import img3 from "../../assets/About3.jpg";
import playVideoText from "../../assets/play-video-text.svg";
import playIconGradient from "../../assets/play-icon-gradient.svg";
import workpressBg from "../../assets/workpress.jpg";

function About () {
    const [openAccordion, setOpenAccordion] = useState('vision');

    const toggleAccordion = (section) => {
        setOpenAccordion(openAccordion === section ? null : section);
    };

    return(
    <div className="about-section">
        <img src={workpressBg} alt="" className="about-bg-waves" />
        <div className="about-container">
          
            <div className="about-gallery">
                <div className="gallery-top">
                    <img src={img1} alt="Patients and doctor" className="img-top" />
                </div>
                <div className="gallery-bottom">
                    <img src={img2} alt="Doctor and child" className="img-bottom-left" />
                    <img src={img3} alt="Vials and tubes" className="img-bottom-right" />
                </div>
                
            
                <div className="play-video-wrapper">
                    <div className="play-circle-text">
                       <img src={playVideoText} alt="Play Video" />
                    </div>
                    <button className="play-btn">
                        <img src={playIconGradient} alt="Play" className="play-icon" />
                    </button>
                </div>
            </div>

           
            <div className="about-content">
                <div className="badge-about">
                    <span className="dot"></span> About Us
                </div>
                
                <h2 className="about-title">
                    We are committed to<br />
                    understanding your <span className="highlight">unique<br />needs and delivering care.</span>
                </h2>
                
                <p className="about-description">
                    As a trusted healthcare provider in our community, we are passionate about promoting health and wellness beyond the clinic.
                </p>

                <div className="about-accordion">
                 
                    <div className={`accordion-item ${openAccordion === 'vision' ? 'active' : ''}`}>
                        <div className="accordion-header" onClick={() => toggleAccordion('vision')}>
                            <h3>Our Vision</h3>
                            <span className="accordion-icon">
                                {openAccordion === 'vision' ? <FaMinus /> : <FaPlus />}
                            </span>
                        </div>
                        {openAccordion === 'vision' && (
                            <div className="accordion-body">
                                <p>We envision a community where everyone has access to high-quality healthcare and the resources they need to lead healthy, fulfilling lives.</p>
                            </div>
                        )}
                    </div>

                    
                    <div className={`accordion-item ${openAccordion === 'mission' ? 'active' : ''}`}>
                        <div className="accordion-header" onClick={() => toggleAccordion('mission')}>
                            <h3>Our Mission</h3>
                            <span className="accordion-icon">
                                {openAccordion === 'mission' ? <FaMinus /> : <FaPlus />}
                            </span>
                        </div>
                        {openAccordion === 'mission' && (
                            <div className="accordion-body">
                                <p>Our mission is to provide compassionate, personalized care that empowers patients to achieve their best health.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
           
            {/* <div className="bg-lines"></div> */}
        </div>
    </div>
    )
}
export default About;