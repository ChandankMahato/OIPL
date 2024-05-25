import React from "react";
import Principle from "../../Components/Principle/principle";
import Contact from "../../Components/Contact/contact";
import Breadcrumb from "../../Components/BreadCrumb/breadCrumb";
import ReportSection from "../../Components/Reports/reports";
import './style.css';

const ReportPage = () => {
  return (
    <>
      <div className="reports">
        <Breadcrumb  title="Reports"/>
        <div className="reportSection">
          <ReportSection/>
        </div>
        <Principle/>
        <Contact />
      </div>
    </>
  );
};

export default ReportPage;
