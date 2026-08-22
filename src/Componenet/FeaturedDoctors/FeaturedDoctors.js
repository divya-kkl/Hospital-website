import React from "react";
import "./FeaturedDoctors.css";
import { FaStar, FaRegHeart, FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";
import docImage from "../../assets/doc.png";
import { useNavigate } from "react-router-dom";

function FeaturedDoctors() {

  const navigate = useNavigate();
  const doctorsData = [
    {
      name: "Dr. Michael Brown",
      specialty: "Psychologist",
      location: "Minneapolis, MN",
      time: "30 Min",
      fee: "$650",
      rating: "5.0",
      image: docImage,
      themeColor: "#5b4cfa"
    },
    {
      name: "Dr. Nicholas Tello",
      specialty: "Pediatrician",
      location: "Ogden, IA",
      time: "60 Min",
      fee: "$350",
      rating: "4.6",
      image: docImage,
      themeColor: "#f44380"
    },
    {
      name: "Dr. Harold Bryant",
      specialty: "Neurologist",
      location: "Winona, MS",
      time: "30 Min",
      fee: "$500",
      rating: "4.8",
      image: docImage,
      themeColor: "#00c39a"
    },
    {
      name: "Dr. Sandra Jones",
      specialty: "Cardiologist",
      location: "Beckley, WV",
      time: "30 Min",
      fee: "$550",
      rating: "4.8",
      image: docImage,
      themeColor: "#0b60f5"
    }
  ];

  return (
    <div className="featured-doctors-section">
      <div className="featured-header">
        <div className='Top-header-1'>
          <p className='circle-3'></p>
          <p className='heading-3'>Featured Doctors </p>
          <p className='circle-4'></p>
        </div>
        <div className='Top-heading-1'>
          <h2 className='heading-2'>Our <span className='span1'> Highlighted </span> Doctor</h2>
        </div>
      </div>

      <div className="featured-grid">
        {doctorsData.map((doctor, index) => (
          <div className="doctor-card" key={index}>
            <div className="doctor-image-wrapper">
              <img src={doctor.image} alt={doctor.name} className="doctor-image" />
              <div className="rating-pill">
                <FaStar className="rating-star" /> {doctor.rating}
              </div>
              <div className="heart-icon-wrapper">
                <FaRegHeart />
              </div>
            </div>

            <div className="doctor-info">
              <div className="specialty-row">
                <div
                  className="left-edge-line"
                  style={{ backgroundColor: doctor.themeColor }}
                ></div>
                <span
                  className="specialty-text"
                  style={{ color: doctor.themeColor }}
                >
                  {doctor.specialty}
                </span>
                <span className="available-pill">
                  <span className="status-dot"></span> Available
                </span>
              </div>

              <h3 className="doctor-name">{doctor.name}</h3>

              <div className="location-row">
                <MdOutlineLocationOn className="location-icon" />
                <span>{doctor.location}</span>
                <span className="dot-separator" style={{ color: doctor.themeColor }}>•</span>
                <span>{doctor.time}</span>
              </div>

              <div className="divider-line"></div>

              <div className="fee-row">
                <div className="fee-col">
                  <p className="fee-label">Consultation Fees</p>
                  <p className="fee-amount">{doctor.fee}</p>
                </div>
                <button className="book-btn" onClick={() => {
                  navigate('/booking-page')
                }}>
                  <FaRegCalendarAlt />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedDoctors;