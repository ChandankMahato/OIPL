import React from "react";
import Principle from "../../Components/Principle/principle";
import Contact from "../../Components/Contact/contact";
import Breadcrumb from "../../Components/BreadCrumb/breadCrumb";
import "./style.css";
const Introduction = () => {
  return (
    <>
      <div className="introduction">
        <Breadcrumb  title="Introduction"/>
        <p className="introduction-text">
          Established in 2020, Ocimum Investment Pvt. Ltd. (OIPL) is a leading private-equity investment company in Nepal. Our mission is to pioneer innovative investment strategies that drive sustainable growth and positive change in the economy. We envision a future where our investments catalyze transformative growth, generate employment opportunities, and contribute significantly to the local economy. Our core values include impactful investing, innovation, collaborative partnerships, ethical practices, and empowering communities. At OIPL, we are committed to contributing significantly to Nepal's economic growth and development, driving positive change for the benefit of all stakeholders.
        </p>
        <Principle/>
        <Contact />
      </div>
    </>
  );
};

export default Introduction;
