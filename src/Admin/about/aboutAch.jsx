import React, { useState } from "react";
import "./about.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Config/Firebase/config";
import { toast } from "react-toastify";


const AboutAdminAch = () => {
  const [icon, setIcon] = useState("");
  const [target, setTarget] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = async(event) => {
    event.preventDefault();
    if(icon.trim() !== "" && target.trim() !== "" && title.trim() !== ""){
     try{
        await addDoc(collection(db, `achivements`), {
        icon,
        target,
        title,
      });
      toast.success("Data Uploaded Successfully")
      setIcon('');
      setTarget('');
      setTitle('');
     }catch(error){
      toast.error("Something Went Wrong");
     }
    }
  }

  return (
      <div className="about-admin-container">
        <div className="about-admin-heading">
          <h3>About Achievement</h3>
        </div>
        <div className="about-admin-form">
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
              <label htmlFor="target">Target:</label>
              <input 
                type="text"
                id="target"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
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

export default AboutAdminAch;
