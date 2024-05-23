import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./projects.css";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { handleImageChange } from "../../Utility/utils";
import { db, storage } from "../../Config/Firebase/config";

const ProjectAdmin = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (title.trim() !== "" && file !== null && category.trim() !== "") {
      const filesFolderRef = ref(storage, `projectFiles/${file.name}`);
      try {
        const timestamp = serverTimestamp();
        await uploadBytes(filesFolderRef, file);
        const downloadURL = await getDownloadURL(filesFolderRef);

        // Reference the projects collection directly
        const projectsRef = collection(db, "projects");

        // Add the project to Firestore with category
        await addDoc(projectsRef, {
          title,
          image: downloadURL,
          createdAt: timestamp,
          category, // Include the category in the document
        });

        toast.success("Data uploaded successfully!");
        setTitle("");
        setFile(null);
        setCategory("");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    }
  };

  const onImageChange = (event) => {
    handleImageChange(event, setFile);
  };

  return (
    <div className="projects-admin-container">
      <div className="projects-admin-heading">
        <h3>Projects</h3>
      </div>
      <div className="projects-admin-form">
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
            <label htmlFor="file">Choose Image:</label>
            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={onImageChange}
              required
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

export default ProjectAdmin;



// import React, { useState } from "react";
// import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
// import "./projects.css";
// import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import { toast } from "react-toastify";
// import { handleImageChange } from "../../Utility/utils";
// import { db, storage } from "../../Config/Firebase/config";

// const ProjectAdmin = () => {
//   const [title, setTitle] = useState("");
//   const [file, setFile] = useState(null);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (title.trim() !== "" && file !== null) {
//       const filesFolderRef = ref(storage, `projectFiles/${file.name}`);
//       try {
//         const timestamp = serverTimestamp();
//         await uploadBytes(filesFolderRef, file);
//         const downloadURL = await getDownloadURL(filesFolderRef);
//         await addDoc(collection(db, "projects"), {
//           title,
//           image: downloadURL,
//           createdAt: timestamp
//         })
//         toast.success("Data uploaded successfully!");
//         setTitle('');
//         setFile(null);
//       } catch (error) {
//         toast.error("Something went wrong");
//       }
//     }
//   };
  
//   const onImageChange = (event) => {
//     handleImageChange(event, setFile);
//   };

//   return (
//     <div className="projects-admin-container">
//       <div className="projects-admin-heading">
//         <h3>Projects</h3>
//       </div>
//       <div className="projects-admin-form">
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="title">Title:</label>
//             <input
//               type="text"
//               id="title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="file">Choose Image:</label>
//             <input
//               type="file"
//               id="file"
//               accept="image/*"
//               onChange={onImageChange}
//               required
//             />
//           </div>
//           <button className="btn" type="submit">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProjectAdmin;
