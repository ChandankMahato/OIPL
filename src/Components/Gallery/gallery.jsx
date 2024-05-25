import React, { useEffect, useState } from "react";
import "./gallery.css";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../Config/Firebase/config";
import { toast } from "react-toastify";
import CustomCarousel from "../Carousel/CustomCarousel";

const Gallery = () => {
  const [groupedData, setGroupedData] = useState([]);

  useEffect(() => {
    const CACHE_KEY = "galleryCache";
    const CACHE_EXPIRATION = 7 * 24 * 60 * 60 * 1000;
    const galleryCollectionRef = collection(db, "gallery");
    const getGalleryList = async () => {
      try{
        const q = query(galleryCollectionRef, orderBy("createdAt", "desc"));
        const data  = await getDocs(q);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
         const sortedData= filteredData.reduce((acc, curr) => {
                if (!acc[curr.category]) {
                  acc[curr.category] = [];
                }
                acc[curr.category].push(curr);
                return acc;
        }, {});
        setGroupedData(Object.values(sortedData));
        const currentTime = new Date().getTime();
        const cachedData = {
            data: filteredData,
            timestamp: currentTime,
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cachedData));
      }catch(error){
         toast.error("Could not Load Project Data");
      }
    };
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        const currentTime = new Date().getTime();
        if (currentTime - timestamp <= CACHE_EXPIRATION) {
        const sortedData= data.reduce((acc, curr) => {
                if (!acc[curr.category]) {
                  acc[curr.category] = [];
                }
                acc[curr.category].push(curr);
                return acc;
        }, {});
        setGroupedData(Object.values(sortedData));
        } else {
            getGalleryList();
        }
    } else {
        getGalleryList();
    }
  }, []);
  
  return (
    <section className="gallery gallery-section" id="gallery">
      <div className="gallery-container">
        <div>
          <div className="gallery-section-title">
            <h2>Gallery</h2>
          </div>
        </div>
        <div className="gallery-row">
          {groupedData.map((group, index) => (
                 <CustomCarousel data={group} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
