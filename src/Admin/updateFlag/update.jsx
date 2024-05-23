import React from "react";
import "./update.css";
import { addDoc, collection, doc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore';
import { toast } from "react-toastify";
import { db } from "../../Config/Firebase/config";

const UpdateFlag = () => {

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const timestamp = serverTimestamp();
    const updateCollectionRef = collection(db, "update");
    const querySnapshot = await getDocs(updateCollectionRef);
    let existingDocId = null;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if ("updatedAt" in data) {
        existingDocId = doc.id;
      }
    });

    if (existingDocId) {
      await updateDoc(doc(updateCollectionRef, existingDocId), {
        updatedAt: timestamp,
      });
    } else {
      await addDoc(updateCollectionRef, {
        updatedAt: timestamp,
      });
    }

    toast.success("Data updated successfully!");
  } catch (error) {
    toast.error("Something went wrong");
  }
};


  return (
    <div className="updates-admin-container">
      <div className="updates-admin-heading">
        <h3>updates</h3>
      </div>
      <div className="updates-admin-form">
        <form onSubmit={handleSubmit}>
          <button className="btn" type="submit">Updated</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateFlag;
