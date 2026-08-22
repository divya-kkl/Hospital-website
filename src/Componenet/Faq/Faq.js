import React, { useState } from 'react';
import './Faq.css';
import { FaPlus, FaTimes } from 'react-icons/fa';
import faqbg from "../../assets/faq-bg-CwvNy87g.jpg";
import faqbg2 from "../../assets/faq-bg-one-DAvvrpN4.jpg";

function Faq() {
  const [activeIndex, setActiveIndex] = useState(1); // 2nd item open by default like the image

  const faqs = [
    {
      question: "How do I book an appointment with a doctor?",
      answer: "You can book an appointment by visiting our booking page, calling our helpline, or visiting the hospital reception directly."
    },
    {
      question: "Can I request a specific doctor when booking my appointment?",
      answer: "Yes, you can usually request a specific doctor when booking your appointment, though availability may vary based on their schedule."
    },
    {
      question: "What should I do if I need to cancel or reschedule my appointment?",
      answer: "Please contact us at least 24 hours in advance if you need to cancel or reschedule to avoid any cancellation fees."
    },
    {
      question: "What if I'm running late for my appointment?",
      answer: "If you're running late, please call the reception. We usually hold your spot for 15 minutes before moving to the next patient."
    },
    {
      question: "Can I book appointments for family members or dependents?",
      answer: "Yes, you can easily book appointments for your family members by providing their details during the booking process."
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
     
     <div className='faq-side-image'>
         <img src = { faqbg2 } alt="" className='side-imgae' />
     </div>

      <div className="faq-container">

        <div className="faq-header">
          <div className="badge-pill blue-badge">
            <span className="dot">•</span> FAQ'S <span className="dot">•</span>
          </div>
          <h2 className="faq-title">
            Your Questions are <span className="highlight-blue">Answered</span>
          </h2>
        </div>


        <div className="faq-accordion">
          {faqs.map((faq, index) => (
            <div
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              key={index}
              onClick={() => toggleAccordion(index)}
            >
              <div className="faq-question">
                <h3>{faq.question}</h3>
                <div className="faq-icon-wrapper">
                  {activeIndex === index ? <FaTimes className="faq-icon" /> : <FaPlus className="faq-icon" />}
                </div>
              </div>
              <div
                className="faq-answer-container"
                style={{
                  maxHeight: activeIndex === index ? '200px' : '0px',
                  opacity: activeIndex === index ? 1 : 0
                }}
              >
                <p className="faq-answer">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
      <div className='bg-line'>
        <img src= {faqbg} alt=""  className='line1'/>
      </div>
      

    </section>
  );
}

export default Faq;
