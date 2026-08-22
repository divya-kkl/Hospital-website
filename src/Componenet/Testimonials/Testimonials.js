import React, { useState,useEffect, useRef } from 'react';
import './Testimonials.css';
import { FaStar, FaQuoteRight } from "react-icons/fa";

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      title: "Nice Treatment",
      desc: "I had a wonderful experience the staff was friendly and attentive, and Dr. Smith took the time to explain everything clearly.",
      name: "Deny Hendrawan",
      location: "United States",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 2,
      title: "Nice Support",
      desc: "My experience was excellent. The staff was polite and attentive, and the doctor took the time to explain every step clearly.",
      name: "Brooks Steave",
      location: "Dallas, CA",
      image: "https://randomuser.me/api/portraits/men/44.jpg"
    },
    {
      id: 3,
      title: "Excellent Service",
      desc: "I had a wonderful experience the staff was friendly and attentive, and Dr. Smith took the time to explain everything clearly.",
      name: "Sofia Doe",
      location: "Los Boston, USA",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    }
  ];

  const stats = [
    { number: 500, label: "Doctors Available", color: "#00c39a", suffix: "+" }, 
    { number: 18, label: "Specialities", color: "#00d4ff", suffix: "+" }, 
    { number: 30, label: "Bookings Done", color: "#5b4cfa", suffix: "K" }, 
    { number: 97, label: "Hospitals & Clinic", color: "#f43f5e", suffix: "+" }, 
    { number: 317, label: "Lab Tests Available", color: "#fbbf24", suffix: "+" } 
  ];

  const AnimatedCounter = ({ end, suffix }) =>{
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const countRef = useRef(null);


    useEffect(() =>{
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !hasStarted) {
            setHasStarted(true)
          }
        },
        { threshold: 0.5}
      );
      if (countRef.current) {
        observer.observe(countRef.current);
      }
      return () => observer.disconnect();
    },[hasStarted]);

    useEffect(() => {
      if (!hasStarted) return;

      let start = 0;
      const duration = 2000;
      const increment = end/ (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end ) {
          setCount(end);
          clearInterval(timer);
        }
        else {
          setCount(Math.ceil(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [end, hasStarted]);

    return <span ref={countRef}>{count}{suffix}</span>;
  };


  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        
        
        <div className="testimonials-header">
          <div className="badge-pill">
            <span className="dot">•</span> Testimonials <span className="dot">•</span>
          </div>
          <h2 className="testimonials-title">
            15k Users <span>Trust Doccure</span> Worldwide
          </h2>
        </div>

     
        <div className="testimonials-grid">
          {testimonials.map((testi) => (
            <div className="testimonial-card" key={testi.id}>
              <div className="card-top">
                <div className="stars">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                </div>
                <FaQuoteRight className="quote-icon" />
              </div>
              <h3 className="testi-title">{testi.title}</h3>
              <p className="testi-desc">{testi.desc}</p>
              <div className="testi-user">
                <img src={testi.image} alt={testi.name} className="user-img" />
                <div className="user-info">
                  <h4>{testi.name}</h4>
                  <p>{testi.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        
        <div className="stats-row">
          {stats.map((stat, index) => (
            <div className="stat-item" key={index}>
              <h3 className="stat-number">
                <AnimatedCounter end={stat.number} suffix={stat.suffix} />
              </h3>
              <div className="stat-line" style={{ backgroundColor: stat.color }}></div>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Testimonials;
