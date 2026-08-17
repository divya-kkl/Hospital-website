import React from 'react';
import './Scroll-banner.css';

function Scroll_banner() {
  const items = [
    "Treatments & Doctors",
    "Lab Testing Services",
    "Medecines & Supplies",
    "Hospitals & Clinics",
    "Health Care Services",
    "Talk to Doctors"
  ];

  return (
    <div className="scroll-banner-container">
      <div className="scroll-banner-track">
        {[...items, ...items].map((item, index) => (
          <div className="scroll-banner-item" key={index}>
            <span className="banner-text">{item}</span>
            <span className="banner-separator"></span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Scroll_banner;