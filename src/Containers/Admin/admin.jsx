import React from "react";
import GalleryAdmin from "../../Admin/Gallery/gallery.jsx";
import AboutAdminExp from "../../Admin/about/aboutExp";
import AboutAdminAch from "../../Admin/about/aboutAch";
import "./admin.css";
import UpdateFlag from "../../Admin/updateFlag/update";
import CarouselAdmin from "../../Admin/Carousel/carousel.jsx";
import NoticeAdmin from "../../Admin/Notice/notice.jsx";

const AdminContent = () => {
  return (
    <>
      <div className="admin-content">
        <CarouselAdmin/>
        <AboutAdminAch/>
        <AboutAdminExp/>
        <GalleryAdmin/>
        <NoticeAdmin/>
        <UpdateFlag/>
      </div>
    </>
  );
};

export default AdminContent;
