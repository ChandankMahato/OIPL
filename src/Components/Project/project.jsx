import React, { useEffect, useState } from "react";
import "./project.css";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../Config/Firebase/config";
import { toast } from "react-toastify";
import CustomCarousel from "../Carousel/CustomCarousel";

const Project = () => {
  const [groupedData, setGroupedData] = useState([]);

  useEffect(() => {
    const CACHE_KEY = "projectCache";
    const CACHE_EXPIRATION = 7 * 24 * 60 * 60 * 1000;
    const projectsCollectionRef = collection(db, "projects");
    const getProjectList = async () => {
      try{
        const q = query(projectsCollectionRef, orderBy("createdAt", "desc"));
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
            getProjectList();
        }
    } else {
        getProjectList();
    }
  }, []);
  
  return (
    <section className="portfolio section" id="projects">
      <div className="container">
        <div className="row">
          <div className="section-title padd-15">
            <h2>Projects</h2>
          </div>
        </div>
        <div className="row">
          {groupedData.map((group, index) => (
                 <CustomCarousel data={group} />
          ))}
        </div>
        <div className="row">
          <div className="portfolio-heading padd-15">
            <a
              className="outside-link"
              rel="noreferrer"
              href={`https://drive.google.com/drive/folders/17d3dCP3bYaKOnp5PU3B1dnzB_RLu7jjr`}
              target="_blank"
            >
              View More Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Project;
