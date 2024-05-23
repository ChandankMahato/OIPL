import React, { useState } from "react";
import "./services.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Config/Firebase/config";
import { toast } from "react-toastify";

const ServiceAdmin = () => {

  const [icon, setIcon] = useState("");
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = async(event) => {
    event.preventDefault();
    if(icon.trim() !== "" && desc.trim() !== "" && title.trim() !== ""){
     try{
        await addDoc(collection(db, `services`), {
        icon,
        desc,
        title,
      });
     toast.success("Data Uploaded Successfully")
     setIcon('');
     setDesc('');
     setTitle('');
     }catch(error){
      toast.error("Something Went Wrong");
     }
    }
  }

  return (
      <div className="service-admin-container">
        <div className="service-admin-heading">
          <h3>Services</h3>
        </div>
        <div className="service-admin-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="icon">Icon:</label>
              <input 
                type="text"
                id="icon"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                required
              />
            </div>
             <div className="form-group">
              <label htmlFor="desc">Desc:</label>
              <input 
                type="text"
                id="desc"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
              />
            </div>
             <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input 
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <button className="btn" type="submit">Submit</button>
          </form>
        </div>
      </div>
  );
};

export default ServiceAdmin;
