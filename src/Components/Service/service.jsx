import React, { useEffect, useState } from "react";
import "./service.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Config/Firebase/config";
import serviceIconData from "./iconData";
import { toast } from "react-toastify";
import { calculateLocalStorageSize } from "../../Utility/utils";

const Service = () => {
  const [serviceData, setServiceData] = useState([]);

  useEffect(() => {
    const CACHE_KEY = "serviceCache";
    const CACHE_EXPIRATION = 7 * 24 * 60 * 60 * 1000;
    const getServiceData = async() => {
      const serviceCollectionRef = collection(db, "services");
      try{
        const data = await getDocs(serviceCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setServiceData(filteredData)
        const currentTime = new Date().getTime();
        const cachedData = {
            data: filteredData,
            timestamp: currentTime,
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cachedData));
      }catch(error){
        toast.error("Could not Load Services Data");
      }
    }
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        const currentTime = new Date().getTime();
        if (currentTime - timestamp <= CACHE_EXPIRATION) {
            setServiceData(data);
        } else {
            getServiceData();
        }
    } else {
        getServiceData();
    }
    
  }, []);

  return <section className="service section" id="services">
    <div className="container">
        <div className="row">
            <div className="section-title padd-15">
              <h2>Services</h2>
            </div>
        </div>
        <div className="row test">
          {
            serviceData.map((data) => (
            <div className="service-item padd-15" key={data.id}>
              <div className="service-item-inner">
                <div className="icon">
                  <i className="fa">{serviceIconData[data.icon]}</i>
                </div>
                <h4>{data.title}</h4>
                <p>{data.desc}</p>
              </div>
            </div>
            ))
          }
        </div>
    </div>
  </section>
};

export default Service;
