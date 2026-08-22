import React from 'react';
import { FaHeadset, FaCommentDots } from 'react-icons/fa6';
import './ContactBanner.css';

function ContactBanner() {
    return (
        <section className="contact-banner-section">
            <div className="contact-banner-container">
                <div className="contact-banner-content">
                    <div className="contact-banner-left">
                        <h2>Working for Your Better Health.</h2>
                    </div>
                    <div className="contact-banner-right">
                        <div className="contact-info-block">
                            <div className="icon-wrapper">
                                <FaHeadset />
                            </div>
                            <div className="info-text">
                                <span className="info-label">Customer Support</span>
                                <span className="info-value">+1 56589 54598</span>
                            </div>
                        </div>
                        <div className="contact-info-block">
                            <div className="icon-wrapper">
                                <FaCommentDots />
                            </div>
                            <div className="info-text">
                                <span className="info-label">Drop Us an Email</span>
                                <span className="info-value">info1256@example.com</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContactBanner;
