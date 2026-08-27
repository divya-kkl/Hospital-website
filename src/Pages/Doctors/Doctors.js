import React, { useState, useEffect } from "react";
import { supabase } from "../../Supabase";
import { FaStar, FaRegHeart } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";
import docImage from "../../assets/doc.png";
import { useNavigate } from "react-router-dom";
import './Doctors.css';

function Doctors() {
  const navigate = useNavigate();
  const [doctorsData, setDoctorsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data: doctors, error } = await supabase
          .from('doctor_users')
          .select('*');

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
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <div className="all-doctors-section" style={{ textAlign: "center", padding: "120px" }}>Loading All Doctors...</div>;
  }

  return (
    <div className="all-doctors-section">
      <div className="all-doctors-header">
        <h2 className="heading-2">All <span className="span1">Doctors</span></h2>
        <p className="subtitle">Browse our complete directory of highly qualified medical professionals.</p>
      </div>

      <div className="all-doctors-grid">
        {doctorsData.length === 0 ? (
           <div style={{ textAlign: "center", width: "100%", padding: "50px", color: "#757575" }}>No doctors registered yet.</div>
        ) : (
          doctorsData.map((doctor, index) => (
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
                  <button className="book-btn" onClick={() => navigate('/booking-page', { state: { doctor } })}>Book Now</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Doctors;
