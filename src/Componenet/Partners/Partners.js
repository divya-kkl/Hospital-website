import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Partners.css';
import { FaPlus, FaHeartbeat, FaAsterisk, FaGlobe, FaMedkit, FaPlusSquare, FaHandHoldingMedical } from 'react-icons/fa';

function Partners() {
  const partnersList = [
    { name: "Apex Health", icon: <FaPlus /> },
    { name: "PrimeLife", icon: <FaHeartbeat /> },
    { name: "ClearSound", icon: <FaAsterisk /> },
    { name: "Airway", icon: <FaGlobe /> },
    { name: "Cureplus", icon: <FaMedkit /> },
    { name: "Medicure", icon: <FaPlusSquare /> },
    { name: "NovaCare", icon: <FaHandHoldingMedical /> }  
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <section className="partners-section">
      <div className="partners-container">
        <p className="partners-subtitle">Trusted Partners with Doccure</p>
        <div className="partners-slider-wrapper">
          <Slider {...settings}>
            {partnersList.map((partner, index) => (
              <div key={index}>
                <div className="partner-item">
                  <span className="partner-icon">{partner.icon}</span>
                  <span className="partner-name">{partner.name}</span>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default Partners;
