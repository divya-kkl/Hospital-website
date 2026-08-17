import React from 'react';
import './Reason-Section.css';
import { FaBriefcaseMedical } from "react-icons/fa";
import { MdGraphicEq } from "react-icons/md";
import { BiMessageRoundedDetail } from "react-icons/bi";
import sideleft from "../../assets/reson-right-side-image.png";
import sideRight from "../../assets/reson-side-image.png";

function ReasonSection() {
  const reasons = [
    {
      title: "Follow-Up Care",
      desc: "We ensure continuity of care through regular follow-ups and communication, helping you stay on track with health goals.",
      icon: <BiMessageRoundedDetail />,
      iconBg: "#fff0ea",
      iconColor: "#f26622"
    },
    {
      title: "Patient-Centered",
      desc: "We prioritize your comfort and preferences, tailoring our services to meet your individual needs and Care from Our Experts",
      icon: <MdGraphicEq />,
      iconBg: "#edf3ff",
      iconColor: "#0b60f5"
    },
    {
      title: "Convenient Access",
      desc: "Easily book appointments online or through our dedicated customer service team, with flexible hours to fit your schedule.",
      icon: <FaBriefcaseMedical />,
      iconBg: "#e6f9fa",
      iconColor: "#00b2d8"
    }
  ];

  return (
    <div className="reason-section">
        <div className = "image-1">
            <img src = { sideleft } alt="side-firs" />
        </div>
      <div className="reason-header">
        <div className="reason-pill">
          <p className="reason-circle"></p>
          <p className="reason-pill-text">Why Book With Us</p>
          <p className="reason-circle"></p>
        </div>
        <h2 className="reason-heading">
          Compelling <span className="reason-highlight">Reasons</span> to Choose
        </h2>
      </div>

      <div className="reason-grid">
        {reasons.map((item, index) => (
          <div className="reason-card" key={index}>
            <div 
              className="reason-icon-wrapper" 
              style={{ backgroundColor: item.iconBg, color: item.iconColor }}
            >
              {item.icon}
            </div>
            <h3 className="reason-card-title">{item.title}</h3>
            <p className="reason-card-desc">{item.desc}</p>
          </div>
        ))}
      </div>

       <div className = "image-2">
            <img src = { sideRight } alt="side-firs" />
        </div>
    </div>
  );
}

export default ReasonSection;