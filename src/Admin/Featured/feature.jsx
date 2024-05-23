import React, { useState } from "react";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { handleImageChange } from "../../Utility/utils";
import { db, storage } from "../../Config/Firebase/config";
import "./feature.css";

const FeaturedAdmin = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (title.trim() !== "" && file !== null) {
      const filesFolderRef = ref(storage, `featuredFiles/${file.name}`);
      try {
        await uploadBytes(filesFolderRef, file);
        const downloadURL = await getDownloadURL(filesFolderRef);
        await addDoc(collection(db, "featured"), {
          title,
          link,
          image: downloadURL,
        })
        toast.success("Data uploaded successfully!");
        setTitle('');
        setLink('');
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
    <div className="featured-admin-container">
      <div className="featured-admin-heading">
        <h3>Featured</h3>
      </div>
      <div className="featured-admin-form">
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
            <label htmlFor="link">Link:</label>
            <input
              type="text"
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
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

export default FeaturedAdmin;
