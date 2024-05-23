import React from "react";
import Principle from "../../Components/Principle/principle";
import Contact from "../../Components/Contact/contact";
import Breadcrumb from "../../Components/BreadCrumb/breadCrumb";
import BOD from "../../Components/BOD/bod";

const BoardOfDirector = () => {
  return (
    <>
      <div className="bod">
        <Breadcrumb  title="Board of Director"/>
        <BOD />
        <Principle/>
        <Contact />
      </div>
    </>
  );
};

export default BoardOfDirector;
