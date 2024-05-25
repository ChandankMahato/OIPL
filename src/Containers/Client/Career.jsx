import React from "react";
import Principle from "../../Components/Principle/principle";
import Contact from "../../Components/Contact/contact";
import Breadcrumb from "../../Components/BreadCrumb/breadCrumb";
import './style.css';
import Career from "../../Components/Career/career";

const CareerPage = () => {
  return (
    <>
      <div className="careers">
        <Breadcrumb title="Careers"/>
        <p className="career-text">
          We always aspire to create ‘a great place work’ as part of our strategic objectives with passionate management and development of our people. The enthusiasm, talent, and commitment of our people are the sources of the competitive strength of our office which helps in seizing any and every opportunity present in today’s competitive market.
        </p>
       <div className="careerSection">
          <Career/>
        </div>
        <Principle/>
        <Contact />
      </div>
    </>
  );
};

export default CareerPage;
