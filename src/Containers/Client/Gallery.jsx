import React from "react";
import Principle from "../../Components/Principle/principle";
import Contact from "../../Components/Contact/contact";
import Breadcrumb from "../../Components/BreadCrumb/breadCrumb";
import Gallery from "../../Components/Gallery/gallery";

const GalleryPage = () => {
  return (
    <>
      <div className="gallery">
        <Breadcrumb  title="Gallery"/>
        <Gallery />
        <Principle/>
        <Contact />
      </div>
    </>
  );
};

export default GalleryPage;
