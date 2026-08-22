import React from "react";
import "./Adsbanner.css";
import apple from "../../assets/apple.png";
import playstore from "../../assets/GooglePla.png";
import mobile from "../../assets/mobile-img.jpg";
import poi1 from "../../assets/poi1.png";
import poi2 from "../../assets/poi2.png";
import poi3 from "../../assets/poi3.png";


function AdsBanner () {
    return (
        <div className="main-banner">
           <div className="main-bbanner1">
            <img src={poi1} alt="" className="poi1" />
            <img src={poi2} alt="" className="poi2" />
            <img src={poi3} alt="" className="poi3" />
           
            <div className="banner1">
                <div className="section-banner">
                    <h3 id="heading1">Working for Your Better Health</h3>
                    <h1 className="heading2">Download the  <br/> Doccure App today!</h1>
                    <button className="AppStore">
                        <img src={apple} alt="App Store" />
                    </button>
                    <button className="gooleStore">
                        <img src={playstore} alt="Google Play" />
                    </button>
                </div>
            </div>
            <div className= "phone-img">
                     <img src={mobile} alt="Mobile App" />
            </div>
           </div> 

        </div>
    )

}
export default AdsBanner;