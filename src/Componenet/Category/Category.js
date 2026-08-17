import React from 'react';
import './Category.css';
import { FaCalendarAlt, FaUserMd, FaHospital, FaHeartbeat, FaPills, FaVial, FaHome } from 'react-icons/fa';



function Category() {

    const Categories = [
       { name: "Book Appointment", icon: <FaCalendarAlt />, color: "#00b4d8" },
        { name: "Talk to Doctors", icon: <FaUserMd />, color: "#4361ee" },
        { name: "Hospitals & Clinics", icon: <FaHospital />, color: "#f72585" },
        { name: "Healthcare", icon: <FaHeartbeat />, color: "#00b4d8" },
        { name: "Medicine & Supplies", icon: <FaPills />, color: "#7209b7" },
        { name: "Lab Testing", icon: <FaVial />, color: "#e85d04" },
        { name: "Home Care", icon: <FaHome />, color: "#2a9d8f" },
    ];
   
   return(

    <div className='Category-continer'>
        <div className='category-list'>
            {Categories.map((cat, index ) => (
                <div className='category-item' key={index}>
                    <div className='icon-circle' style= {{backgroundColor: cat.color}}>
                {cat.icon}
                </div>
                <span>{cat.name}</span>
            </div>

            )

            )}

        </div>
    </div>
   )
}

export default Category;
