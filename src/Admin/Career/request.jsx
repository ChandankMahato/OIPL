import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Config/Firebase/config";
import { toast } from "react-toastify";
import "./request.css";

const Requests = () => {

  const [requestData, setRequestData] = useState([]);
  
  useEffect(() => {
    const getRequestData = async() => {
      const requestDataRef = collection(db, "careers");
      try{
        const data = await getDocs(requestDataRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        setRequestData(filteredData);
      }catch(error){
        toast.error("Could not Load Client Request");
      }
    }
    getRequestData();
  }, []);

  return (
    <section className="requests section">
      <div className="requests-container">
        <div className="row">
          <div className="section-title padd-15">
            <h2>Client Requests ({requestData.length})</h2>
          </div>
        </div>

        <div className="requests-content">
          <div className="row">
            {
              requestData.map((data) => (
                <div className="requests-item padd-15" key={data.id}>
                  <div className="requests-item-inner">
                      <div className="requests-items">
                        <p className="requests-items-title">User ID: </p>
                        <p className="requests-items-value">{data.userId}</p>
                      </div>
                      <div className="requests-items">
                        <p className="requests-items-title">Date: </p>
                        <p className="requests-items-value">{data.date}</p>
                      </div>
                      <div className="requests-items">
                        <p className="requests-items-title">Name: </p>
                        <p className="requests-items-value">{data.name}</p>
                      </div>
                      <div className="requests-items">
                        <p className="requests-items-title">Email: </p>
                        <p className="requests-items-value">{data.email}</p>
                      </div>
                      <div className="requests-items">
                        <p className="requests-items-title">Gender: </p>
                        <p className="requests-items-value">{data.gender}</p>
                      </div>
                      <div className="requests-items">
                        <p className="requests-items-title">Phone: </p>
                        <p className="requests-items-value">{data.phone}</p>
                      </div>
                      <div className="requests-items">
                        <p className="requests-items-title">Address: </p>
                        <p className="requests-items-value">{data.address}</p>
                      </div>
                      <div className="requests-items">
                        <p className="requests-items-title">Job Position: </p>
                        <p className="requests-items-value">{data.jobPosition}</p>
                      </div>
                      <div className="requests-items">
                        <p className="requests-items-title">Years of Experience: </p>
                        <p className="requests-items-value">{data.experience}</p>
                      </div>
                      <div className="requests-items">
                        <p className="requests-items-title">Cover Letter: </p>
                        <p className="requests-items-value">{data.coverLetter}</p>
                      </div>
                      <div className="requests-items">
                        <p className="requests-items-title">CV: </p>
                        <button className="btn"
                          onClick={() => {
                            window.open(data.cvUrl, '_blank');
                          }}
                        >
                          Download CV
                        </button>
                      </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default Requests;
