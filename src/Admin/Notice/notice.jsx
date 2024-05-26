import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./notice.css";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { handleImageChange } from "../../Utility/utils";
import { db, storage } from "../../Config/Firebase/config";

const NoticeAdmin = () => {
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [category, setCategory] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (title.trim() !== "" && (imageFile !== null || pdfFile !== null) && category.trim() !== "") {
      try {
        const timestamp = serverTimestamp();
        let image = "";
        let pdfUrl = "";

        if (imageFile) {
          const imageRef = ref(storage, `noticeFiles/images/${imageFile.name}`);
          await uploadBytes(imageRef, imageFile);
          image = await getDownloadURL(imageRef);
        }

        if (pdfFile) {
          const pdfRef = ref(storage, `noticeFiles/pdfs/${pdfFile.name}`);
          await uploadBytes(pdfRef, pdfFile);
          pdfUrl = await getDownloadURL(pdfRef);
        }

        // Reference the projects collection directly
        const noticeRef = collection(db, "notice");

        // Add the project to Firestore with category
        await addDoc(noticeRef, {
          title,
          image,
          pdfUrl,
          createdAt: timestamp,
          category, // Include the category in the document
        });

        toast.success("Data uploaded successfully!");
        setTitle("");
        setImageFile(null);
        setPdfFile(null);
        setCategory("");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    }
  };

  const onImageChange = (event) => {
    handleImageChange(event, setImageFile);
  };

  const onPdfChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  return (
    <div className="notice-admin-container">
      <div className="notice-admin-heading">
        <h3>OIPL Notice</h3>
      </div>
      <div className="notice-admin-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
          <div className="form-group">
            <label htmlFor="imageFile">Choose Image:</label>
            <input
              type="file"
              id="imageFile"
              accept="image/*"
              onChange={onImageChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pdfFile">Choose PDF:</label>
            <input
              type="file"
              id="pdfFile"
              accept="application/pdf"
              onChange={onPdfChange}
            />
          </div>
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NoticeAdmin;
