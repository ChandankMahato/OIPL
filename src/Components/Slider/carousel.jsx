import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Config/Firebase/config";
import "./carousel.css";  // Import your carousel specific CSS

const Carousel = () => {
  const [carouselImages, setCarouselImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchCarouselImages = async () => {
      try {
        const carouselCollectionRef = collection(db, "carousel");
        const data = await getDocs(carouselCollectionRef);
        const images = data.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCarouselImages(images);
      } catch (error) {
        console.error("Error fetching carousel images: ", error);
      }
    };
    fetchCarouselImages();
  }, []);

  useEffect(() => {
    console.log(carouselImages);
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % carouselImages.length);
    }, 5000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [carouselImages]);

  if (carouselImages.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="carousel">
      {carouselImages.map((image, index) => (
        <div
          key={image.id}
          className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
        >
          <img src={image.image} alt={image.title} />
          <div className="carousel-caption">{image.title}</div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
