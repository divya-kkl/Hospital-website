import React, { useState, useEffect } from "react";
import { supabase } from "../../Supabase";
import "./FeaturedDoctors.css";
import { FaStar, FaRegHeart, FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";
import docImage from "../../assets/doc.png";
import { useNavigate } from "react-router-dom";

function FeaturedDoctors() {

  const navigate = useNavigate();
  const [doctorsData, setDoctorsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data: doctors, error } = await supabase
          .from('doctor_users')
          .select('*')
          .limit(4);

        if (error) {
          throw error;
        }

        if (doctors && doctors.length > 0) {
          const emails = doctors.map(d => d.email);
          const { data: schedules } = await supabase
            .from('doctor_schedules')
            .select('email, status')
            .in('email', emails);

          const scheduleMap = {};
          if (schedules) {
            schedules.forEach(s => {
              scheduleMap[s.email] = s.status;
            });
          }

          const doctorsWithStatus = doctors.map(d => ({
            ...d,
            status: scheduleMap[d.email] || 'Available'
          }));

          setDoctorsData(doctorsWithStatus);
        } else {
          setDoctorsData([]);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return <div className="featured-doctors-section" style={{ textAlign: "center", padding: "50px" }}>Loading Featured Doctors...</div>;
  }

  return (
    <div className="featured-doctors-section" id="featured-doctors">
      <div className="featured-header">
        <div className='Top-header-1'>
          <p className='circle-3'></p>
          <p className='heading-3'>Featured Doctors </p>
          <p className='circle-4'></p>
        </div>
        <div className='Top-heading-1'>
          <h2 className='heading-2'>Our <span className='span1'> Highlighted </span> Doctor</h2>
          <span className="view-all-text" onClick={() => navigate('/doctors')}>View All</span>
        </div>
      </div>

      <div className="featured-grid">
        {doctorsData.map((doctor, index) => (
          <div className="doctor-card" key={index}>
            <div className="doctor-image-wrapper">
              <img src={doctor.image || docImage} alt={doctor.name} className="doctor-image" />
              <div className="rating-pill">
                <FaStar className="rating-star" /> {doctor.rating || "4.6"}
              </div>
              <div className="heart-icon-wrapper">
                <FaRegHeart />
              </div>
            </div>

            <div className="doctor-info">
              <div className="specialty-row">
                <div
                  className="left-edge-line"
                  style={{ backgroundColor: doctor.themeColor || "#0b60f5" }}
                ></div>
                <span
                  className="specialty-text"
                  style={{ color: doctor.themeColor || "#0b60f5" }}
                >
                  {doctor.specialty || doctor.specialization || "General"}
                </span>
                {doctor.status === 'Unavailable' ? (
                  <span className="available-pill" style={{ backgroundColor: '#ffebee', color: '#c62828' }}>
                    <span className="status-dot" style={{ backgroundColor: '#c62828' }}></span> Unavailable
                  </span>
                ) : (
                  <span className="available-pill">
                    <span className="status-dot"></span> Available
                  </span>
                )}
              </div>

              <h3 className="doctor-name">{doctor.name}</h3>

              <div className="location-row">
                <MdOutlineLocationOn className="location-icon" />
                <span>{doctor.location || "Ogden, IA"}</span>
                <span className="dot-separator" style={{ color: doctor.themeColor || "#0b60f5" }}>•</span>
                <span>{doctor.time || "60 Min"}</span>
              </div>

              <div className="divider-line"></div>

              <div className="fee-row">
                <div className="fee-col">
                  <p className="fee-label">Consultation Fees</p>
                  <p className="fee-amount">{doctor.fee || "$350"}</p>
                </div>
                <button className="book-btn" onClick={() => {
                  navigate('/booking-page', { state: { doctor } })
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