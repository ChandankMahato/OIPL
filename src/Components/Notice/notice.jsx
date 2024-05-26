import React, { useEffect, useState } from "react";
import "./notice.css";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../Config/Firebase/config";
import { toast } from "react-toastify";
import CustomCarousel from "../Carousel/CustomCarousel";

const Notice = () => {
  const [groupedData, setGroupedData] = useState([]);

  useEffect(() => {
    const CACHE_KEY = "noticeCache";
    const CACHE_EXPIRATION = 7 * 24 * 60 * 60 * 1000;
    const noticeCollectionRef = collection(db, "notice");
    const getNoticeList = async () => {
      try{
        const q = query(noticeCollectionRef, orderBy("createdAt", "desc"));
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
            getNoticeList();
        }
    } else {
        getNoticeList();
    }
  }, []);
  
   return (
    <section className="notice notice-section" id="notice">
      <div className="notice-container">
        <div>
          <div className="notice-section-title">
            <h2>Notices</h2>
          </div>
        </div>
        <div className="notice-row">
          {groupedData.map((group, index) => (
                  <CustomCarousel data={group} path="notice"/>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Notice;
