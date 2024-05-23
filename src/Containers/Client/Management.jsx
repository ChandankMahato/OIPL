import React from "react";
import Principle from "../../Components/Principle/principle";
import Contact from "../../Components/Contact/contact";
import Breadcrumb from "../../Components/BreadCrumb/breadCrumb";
import Management from "../../Components/Management/management";

const ManagementTeam = () => {
  return (
    <>
      <div className="managementTeam">
        <Breadcrumb  title="Management Team"/>
        <Management />
        <Principle/>
        <Contact />
      </div>
    </>
  );
};

export default ManagementTeam;
