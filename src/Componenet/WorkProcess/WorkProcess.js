import React from 'react';
import './WorkProcess.css';
import { FiSearch } from "react-icons/fi";
import { FaUserShield, FaRegCalendarAlt, FaRegCommentDots } from "react-icons/fa";
import processArrow from "../../assets/process-arrow.svg";
import workprocessBg from "../../assets/workprocess1.jpg";

function WorkProcess() {
  const steps = [
    {
      id: "01",
      title: "Search For Doctors",
      desc: "Search for a doctor based on specialization, location, or availability for your Treatments",
      icon: <FiSearch />,
      bgColor: "#3b82f6" 
    },
    {
      id: "02",
      title: "Check Doctor Profile",
      desc: "Explore detailed doctor profiles on our platform to make informed healthcare decisions.",
      icon: <FaUserShield />,
      bgColor: "#e04f16" 
    },
    {
      id: "03",
      title: "Schedule Appointment",
      desc: "After choose your preferred doctor, select a convenient time slot, & confirm your appointment.",
      icon: <FaRegCalendarAlt />,
      bgColor: "#00c39a" 
    },
    {
      id: "04",
      title: "Get Your Solution",
      desc: "Discuss your health with the doctor and the personalized advice & with solution.",
      icon: <FaRegCommentDots />,
      bgColor: "#5b4cfa"
    }
  ];

  return (
    <section className="work-process-section">
      <img src={workprocessBg} alt="" className="work-bg-waves" />
      <div className="process-container">
        <div className="process-grid">
          {steps.map((step, index) => (
            <div className="process-step" key={index}>
              <div className="step-icon-wrapper" style={{ backgroundColor: step.bgColor }}>
                {step.icon}
              </div>
              
             
              {index !== steps.length - 1 && (
                <div className="step-arrow">
                  <img src={processArrow} alt="arrow" />
                </div>
              )}

              <h3 className="step-title">
                {step.title}
              </h3>
              <p className="step-desc">{step.desc}</p>
              
              <div className="step-number">
                {step.id}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WorkProcess;
