import React from "react";
import './Topheader.css';
import { TbMessageFilled } from "react-icons/tb";
import { RiPhoneFill } from "react-icons/ri";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import indFlag from "../../assets/IND.png";

function Topheader() {

    return (
        <div className="header-Top">
            <div className="continer">
                <div className="topbar-Info">
                    <div className="header-Info">
                        <p className="top-Content">
                            <TbMessageFilled />
                            info@example.com
                        </p>
                        <p className="top-phone">
                            <RiPhoneFill />
                            +1234567890
                        </p>

                    </div>
                    <div className="right-section">
                        <ul>
                            <li className="drop-down">
                                <div className="lan-top">
                                   <img src = { indFlag } alt="flag"/>
                                   IND
                                </div>
                            </li>
                        </ul>
                        <div className="divider"></div>
                        <div className="social-icons">
                            <a href="#"><FaFacebookF /></a>
                            <a href="#"><FaXTwitter /></a>
                            <a href="#"><FaInstagram /></a>
                            <a href="#"><FaLinkedinIn /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Topheader;