import React, { useEffect, useState } from "react";
import "./messages.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Config/Firebase/config";
import { toast } from "react-toastify";
import "./messages.css";

const Messages = () => {

  const [messageData, setMessageData] = useState([]);
  
  useEffect(() => {
    const getMessageData = async() => {
      const messageDataRef = collection(db, "contacts");
      try{
        const data = await getDocs(messageDataRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        setMessageData(filteredData);
      }catch(error){
        toast.error("Could not Load Client Messages");
      }
    }
    getMessageData();
  }, []);

  return (
    <section className="messages section">
      <div className="messages-container">
        <div className="row">
          <div className="section-title padd-15">
            <h2>Client Messages ({messageData.length})</h2>
          </div>
        </div>

        <div className="messages-content">
          <div className="row">
            {
              messageData.map((data) => (
                <div className="messages-item padd-15" key={data.id}>
                  <div className="messages-item-inner">
                      <div className="messages-items">
                        <p className="messages-items-title">User ID: </p>
                        <p className="messages-items-value">{data.userId}</p>
                      </div>
                      <div className="messages-items">
                        <p className="messages-items-title">Date: </p>
                        <p className="messages-items-value">{data.date}</p>
                      </div>
                      <div className="messages-items">
                        <p className="messages-items-title">Name: </p>
                        <p className="messages-items-value">{data.name}</p>
                      </div>
                      <div className="messages-items">
                        <p className="messages-items-title">Email: </p>
                        <p className="messages-items-value">{data.email}</p>
                      </div>
                      <div className="messages-items">
                        <p className="messages-items-title">Subject: </p>
                        <p className="messages-items-value">{data.subject}</p>
                      </div>
                      <div className="messages-items">
                        <p className="messages-items-title">Messages: </p>
                        <p className="messages-items-value">{data.message}</p>
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

export default Messages;
