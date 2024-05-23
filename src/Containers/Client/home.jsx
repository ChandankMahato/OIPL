import React from "react";
import Principle from "../../Components/Principle/principle";
import Contact from "../../Components/Contact/contact";
import Carousel from "../../Components/Slider/carousel";
import Feature from '../../Components/Feature/feature';

const Home = () => {
  return (
    <>
      <div className="main-content">
        <Carousel />
        <Feature />
        <Principle />
        <Contact />
      </div>
    </>
  );
};

export default Home;
