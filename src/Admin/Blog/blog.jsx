import React, { useEffect, useState } from "react";
import "./blog.css";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";

import { toast } from "react-toastify";
import "./blog.css";
import EDITOR from "./editor";
import Category from "./category";
import BlogImage from "./blogImage";
import BlogData from "./blogData";
import { getCurrentDate,handleImageChange, handleImageSubmit, handleURLCopy } from "../../Utility/utils";
import ConfirmationModal from "../../Utility/confirmModal";
import { db } from "../../Config/Firebase/config";

const BlogAdmin = () => {

  const [category, setCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryMap, setCategoryMap] = useState({});
  const [timeRead, setTimeRead] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [blogId, setBlogId] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [copyURL, setCopyURL] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageDownloadURL, setImageDownloadURL] = useState('');
  const folderName = 'blogFiles';
  
  const currentDate = getCurrentDate();

  const onImageSubmit = (event) => {
    event.preventDefault();
    handleImageSubmit(imageFile, setImageFile, setImageDownloadURL, folderName);
  };

  const onImageChange = (event) => {
    handleImageChange(event, setImageFile);
  };

  const onURLCopy = () => {
    handleURLCopy(imageDownloadURL, setCopyURL);
  };

  const handleCategory = async(event) => {
    event.preventDefault();
    if(category.trim() !== ""){
      try{
        await addDoc(collection(db, `categories`), {
          title: category
        })
        toast.success("Data Uploaded Successfully");
        setCategory("");
      }catch(error){
        toast.error("Something Went Wrong")
      }
    }
  }

  const handleBlogData = async (event) => {
    event.preventDefault();
    if (
      timeRead.trim() !== "" &&
      title.trim() !== "" &&
      summary.trim() !== "" &&
      blogContent.trim() !== ""
    ) {
      try {
        const timestamp = serverTimestamp();
        if (blogId) {
          const blogDocRef = doc(db, "blogdata", blogId);
          await updateDoc(blogDocRef, {
            category: categoryMap,
            timeRead,
            date: currentDate,
            title,
            summary,
            blogContent,
          });
        } else {
          await addDoc(collection(db, `blogdata`), {
            category: categoryMap,
            timeRead,
            date: currentDate,
            title,
            summary,
            blogContent,
            likes: {count:0},
            comments: [],
            createdAt: timestamp
          });
        }
        toast.success("Data Uploaded Successfully");
      } catch (error) {
        toast.error("Something Went Wrong");
      }
    } else {
      toast.info("Something is Missing");
    }
  };


  const getBlogData = async(e) => {
      e.preventDefault();
      try {
          if(blogId){
            const blogRef = doc(db, "blogdata", blogId);
            const docSnap = await getDoc(blogRef);
            if (docSnap.exists()) {
              const data = docSnap.data();
              setSelectedCategory(data.category['title']);
              setCategoryMap(data.category);
              setTimeRead(data.timeRead);
              setTitle(data.title);
              setSummary(data.summary);
              setBlogContent(data.blogContent);
              toast.success('Data Loaded Successfully');
            } else {
              toast.error("Blog Not Found");
            }
          }else{
            toast.info("Provide blogId fetch data")
          }
        } catch (error) { 
          toast.error('Error Loading Data');
    }
  }

  const handleDeleteClick = (e) => {
    e.preventDefault();
    if(blogId){
      setIsOpen(true);
    }else{
       return toast.info("Provide blogId to Delete")
    }
  };

  const deleteBlogData = async (e) => {
    e.preventDefault();
    if (!blogId) {
      return;
    }
    try {
      await deleteDoc(doc(db, 'blogdata', blogId));
      toast.success('Blog Data Deleted Successfully');
    } catch (error) {
      toast.error('Error Deleting Data');
    } finally {
      setIsOpen(false);
      setBlogId('');
      setCategoryMap({});
      setSelectedCategory('');
      setTimeRead('');
      setTitle('');
      setSummary('');
      setBlogContent('');
    }
  };

    useEffect(() => {
    const getCategoryList = async () => {
      const categoriesCollectionRef = collection(db, "categories");
      try{
        const data  = await getDocs(categoriesCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        setCategories(filteredData);
      }catch(error){
         toast.error("Could not Load Category Data");
      }
    };
    getCategoryList();
  }, []);

  return (
      <div className="blog-admin-container">
        <div className="blog-admin-heading">
          <h3>Blog Admin</h3>
        </div>
        <Category
          category={category}
          setCategory={setCategory}
          handleCategory={handleCategory}
        />
        <div className="vertical-gap"></div>
        <BlogImage
          handleImageChange = {onImageChange} 
          handleImageSubmit = {onImageSubmit}
          imageDownloadURL = {imageDownloadURL}
          handleURLCopy ={onURLCopy}
          copyURL = {copyURL}
        />
        <div className="vertical-gap"></div>
        <BlogData
          handleBlogData ={handleBlogData}
          selectedCategory = {selectedCategory}
          setSelectedCategory = {setSelectedCategory}
          setCategoryMap = {setCategoryMap}
          categories = {categories}
          timeRead = {timeRead}
          setTimeRead ={setTimeRead}
          title = {title}
          setTitle ={setTitle}
          summary = {summary}
          setSummary ={setSummary}
          blogContent = {blogContent}
          blogId = {blogId}
          setBlogId = {setBlogId}
          getBlogData = {getBlogData}
          handleDeleteClick={handleDeleteClick}
        />
        <div className="vertical-gap"></div>
        <div className="editor-container">
          <EDITOR 
            blogContent={blogContent} 
            setBlogContent={setBlogContent}
          />
        </div>
        <ConfirmationModal 
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={deleteBlogData}
        />
      </div>
  );
};

export default BlogAdmin;
