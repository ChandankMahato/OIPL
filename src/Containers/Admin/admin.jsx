import React from "react";
import ProjectAdmin from "../../Admin/Gallery/gallery.jsx";
import AboutAdminExp from "../../Admin/about/aboutExp";
import AboutAdminAch from "../../Admin/about/aboutAch";
import "./admin.css";
import UpdateFlag from "../../Admin/updateFlag/update";
import CarouselAdmin from "../../Admin/Carousel/carousel.jsx";

const AdminContent = () => {
  return (
    <>
      <div className="admin-content">
        <CarouselAdmin/>
        <AboutAdminAch/>
        <AboutAdminExp/>
        <ProjectAdmin/>
        <UpdateFlag/>
      </div>
    </>
  );
};

export default AdminContent;
