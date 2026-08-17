import React, { useRef } from 'react';
import './TopSpecialties.css';
import cardiology from '../../assets/cardiology.jpg';
import endocrinology from "../../assets/endocrinology.jpg";
import neurology from "../../assets/neurology.jpg";
import orthopedics from "../../assets/orthopedics.jpg";
import pediatrics from "../../assets/pediatrics.jpg";
import Psychiatry from "../../assets/psychiatry.jpg";
import pulmonology from "../../assets/Pulmonology.jpg";
import urology from '../../assets/urology.jpg';
import neurologygif from "../../assets/brain.gif";
import heartbeatgif from "../../assets/heartbeat.gif";
import kidneysgif from "../../assets/kidneys.gif";
import puzzlegif from "../../assets/puzzle.gif";
import spinegif from "../../assets/spine.gif";
import thyroidgif from "../../assets/thyroid.gif"
import pulmonologypng from "../../assets/pulmonology-1.png";
import pediatricpng from "../../assets/pediatric-1.png";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";



function TopSpecialties() {

    const scrollRef = useRef(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -280, behavior: "smooth"});
            
        }
    };

    const ScrollRight = () => {
        if (scrollRef.current)
             scrollRef.current.scrollBy(({ left: 280, behavior: "smooth"}))
    }

    const specialtiesData = [
        { name: "neurology", doctors: 112, image: neurology, icon: neurologygif },
        { name: "Endocrinology", doctors: 104, image: endocrinology, icon: thyroidgif },
        { name: "Pulmonology", doctors: 41, image: pulmonology, icon: pulmonologypng },
        { name: "Urology", doctors: 39, image: urology, icon: kidneysgif },
        { name: "Cardiology", doctors: 254, image: cardiology, icon: heartbeatgif },
        { name: "orthopedics", doctors: 254, image: orthopedics, icon: spinegif },
        { name: "pediatrics", doctors: 254, image: pediatrics, icon: pediatricpng },
        { name: "Psychiatry", doctors: 254, image: Psychiatry, icon: puzzlegif },

    ];



    return (
        <>
            <div className='TopSpecialties'>
                <div className='TopSpecialties-continer'>
                    <div className='Top-header'>
                        <p className='circle-1'></p>
                        <p className='heading'>Top Specialties </p>
                        <p className='circle-2'></p>
                    </div>

                    <div className='Top-heading'>
                        <h2 className='heading-1'>Highlighting the <span className='span'>Care & Support</span></h2>
                    </div>

                    <div className='slider-container'>
                        
                        <button className='slider-arrow left-arrow' onClick={scrollLeft}>
                            <MdKeyboardArrowLeft />
                        </button>
                        
                        <div className='specialties-grid' ref={scrollRef}>
                            {specialtiesData.map((item, index) => (
                                <div className='specialty-card' key={index}>
                                    <div className='specialty-image-wrapper'>
                                        <img src={item.image} alt={item.name} className='specialty-image' />
                                        <div className='specialty-icon-circle'>
                                            <img src={item.icon} alt="icon" style={{ width: '40px', height: '40px' }} />
                                        </div>
                                    </div>
                                    <div className='specialty-info'>
                                        <h3>{item.name}</h3>
                                        <p>{item.doctors} Doctors</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className='slider-arrow right-arrow' onClick={ScrollRight}>
                            <MdOutlineKeyboardArrowRight />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default TopSpecialties;