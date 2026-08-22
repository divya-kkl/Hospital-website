/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { FaFacebookF, FaXTwitter, FaInstagram, FaLinkedinIn, FaPinterestP, FaPaperPlane } from "react-icons/fa6";
import { FaCcVisa, FaCcAmex, FaCcDiscover, FaCcMastercard, FaCcStripe, FaCcPaypal } from "react-icons/fa";
import "./Footer.css";

function Footer() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            
            if (scrollHeight > 0) {
                const progress = (scrollTop / scrollHeight) * 100;
                setScrollProgress(progress);
            }

            if (scrollTop > 200) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <footer className="footer-section">
            <div className="footer-container">
                <div className="footer-row">
                    <div className="footer-col">
                        <h4>Company</h4>
                        <ul>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Features</a></li>
                            <li><a href="#">Works</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Locations</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Treatments</h4>
                        <ul>
                            <li><a href="#">Dental</a></li>
                            <li><a href="#">Cardiac</a></li>
                            <li><a href="#">Spinal Cord</a></li>
                            <li><a href="#">Hair Growth</a></li>
                            <li><a href="#">Anemia & Disorder</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Specialities</h4>
                        <ul>
                            <li><a href="#">Transplant</a></li>
                            <li><a href="#">Cardiologist</a></li>
                            <li><a href="#">Oncology</a></li>
                            <li><a href="#">Pediatrics</a></li>
                            <li><a href="#">Gynacology</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Utilites</h4>
                        <ul>
                            <li><a href="#">Pricing</a></li>
                            <li><a href="#">Contact</a></li>
                            <li><a href="#">Request A Quote</a></li>
                            <li><a href="#">Premium Membership</a></li>
                            <li><a href="#">Integrations</a></li>
                        </ul>
                    </div>
                    <div className="footer-col newsletter-col">
                        <h4>Newsletter</h4>
                        <p>Subscribe & Stay Updated from the Doccure</p>
                        <form className="newsletter-form">
                            <input type="email" placeholder="Enter Email Address" required />
                            <button type="submit">
                                <FaPaperPlane style={{fontSize: "18px"}} /> Send
                            </button>
                        </form>
                        
                        <div className="social-links">
                            <h4>Connect With Us</h4>
                            <div className="social-icons">
                                <a href="#"><FaFacebookF /></a>
                                <a href="#"><FaXTwitter /></a>
                                <a href="#"><FaInstagram /></a>
                                <a href="#"><FaLinkedinIn /></a>
                                <a href="#"><FaPinterestP /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="footer-bottom">
                <div className="footer-bottom-container">
                    <div className="copyright">
                        <p>Copyright &copy; 2026 Doccure. All Rights Reserved</p>
                    </div>
                    <div className="legal-links">
                        <a href="#">Legal Notice</a> &bull; <a href="#">Privacy Policy</a> &bull; <a href="#">Refund Policy</a>
                    </div>
                    <div className="payment-icons">
                        <span className="pay-icon visa"><FaCcVisa /></span>
                        <span className="pay-icon amex"><FaCcAmex /></span>
                        <span className="pay-icon discover"><FaCcDiscover /></span>
                        <span className="pay-icon mastercard"><FaCcMastercard /></span>
                        <span className="pay-icon stripe"><FaCcStripe /></span>
                        <span className="pay-icon paypal"><FaCcPaypal /></span>
                    </div>
                </div>
            </div>
           
            <div 
                className={`scroll-to-top-wrapper ${isVisible ? 'show' : ''}`} 
                onClick={scrollToTop}
                style={{ background: `conic-gradient(#316Dff ${scrollProgress}%, #d4e0f0 ${scrollProgress}%)` }}
            >
                <div className="scroll-inner">
                    &uarr;
                </div>
            </div>
        </footer>
    );
}

export default Footer;
