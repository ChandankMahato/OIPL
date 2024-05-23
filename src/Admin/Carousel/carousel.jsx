import React, { useState } from "react";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { handleImageChange } from "../../Utility/utils";
import { db, storage } from "../../Config/Firebase/config";
import "./carousel.css";

const CarouselAdmin = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (title.trim() !== "" && file !== null) {
      const filesFolderRef = ref(storage, `carouselFiles/${file.name}`);
      try {
        await uploadBytes(filesFolderRef, file);
        const downloadURL = await getDownloadURL(filesFolderRef);
        await addDoc(collection(db, "carousel"), {
          title,
          image: downloadURL,
        })
        toast.success("Data uploaded successfully!");
        setTitle('');
        setFile(null);
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };
  
  const onImageChange = (event) => {
    handleImageChange(event, setFile);
  };

  return (
    <div className="carousel-admin-container">
      <div className="carousel-admin-heading">
        <h3>OIPL Carousel</h3>
      </div>
      <div className="carousel-admin-form">
        <form onSubmit={handleSubmit}>
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
          <div className="form-group">
            <label htmlFor="file">Choose Image:</label>
            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={onImageChange}
              required
            />
          </div>
          <button className="btn" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CarouselAdmin;
