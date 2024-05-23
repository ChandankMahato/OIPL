import React from "react";
import Principle from "../../Components/Principle/principle";
import Contact from "../../Components/Contact/contact";
import Breadcrumb from "../../Components/BreadCrumb/breadCrumb";
import MissionVisionValues from "../../Components/MissionVision/missionVision";

const Mission = () => {
  return (
    <>
      <div className="mission">
        <Breadcrumb  title="Mission Vision"/>
        <MissionVisionValues />
        <Principle/>
        <Contact />
      </div>
    </>
  );
};

export default Mission;
