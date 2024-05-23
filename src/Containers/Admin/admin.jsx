import React from "react";
import ProjectAdmin from "../../Admin/Projects/projects";
import ServiceAdmin from "../../Admin/services/services";
import AboutAdminExp from "../../Admin/about/aboutExp";
import AboutAdminAch from "../../Admin/about/aboutAch";
import "./admin.css";
import FeaturedAdmin from "../../Admin/Featured/feature";
import UpdateFlag from "../../Admin/updateFlag/update";
import CarouselAdmin from "../../Admin/Carousel/carousel.jsx";

const AdminContent = () => {
  return (
    <>
      <div className="admin-content">
        <FeaturedAdmin/>
        <CarouselAdmin/>
        <AboutAdminAch/>
        <AboutAdminExp/>
        <ProjectAdmin/>
        <ServiceAdmin/>
        <UpdateFlag/>
      </div>
    </>
  );
};

export default AdminContent;
