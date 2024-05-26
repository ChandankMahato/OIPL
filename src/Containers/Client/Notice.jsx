import React from "react";
import Principle from "../../Components/Principle/principle";
import Contact from "../../Components/Contact/contact";
import Breadcrumb from "../../Components/BreadCrumb/breadCrumb";
import Notice from "../../Components/Notice/notice";

const NoticePage = () => {
  return (
    <>
      <div className="notice">
        <Breadcrumb  title="Notice"/>
        <Notice />
        <Principle/>
        <Contact />
      </div>
    </>
  );
};

export default NoticePage;
