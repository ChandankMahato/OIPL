import React, { useState } from "react";
import "./about.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Config/Firebase/config";
import { toast } from "react-toastify";


const AboutAdminExp = () => {
  const [address, setAddress] = useState("");
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = async(event) => {
    event.preventDefault();
    if(address.trim() !== "" && desc.trim() !== "" && title.trim() !== ""){
     try{
        await addDoc(collection(db, `experiences`), {
        address,
        desc,
        title,
      });
     toast.success("Data Uploaded Successfully");
     setAddress('');
     setDesc('');
     setTitle('');
     }catch(error){
      toast.error("Something Went Wrong");
     }
    }
  }
  return (
      <div className="about-admin-container">
        <div className="about-admin-heading">
          <h3>About Experience</h3>
        </div>
        <div className="about-admin-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input 
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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

export default AboutAdminExp;
