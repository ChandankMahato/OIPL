import React, { useState, useEffect } from 'react';
import './CustomCarousel.css'; // Import your custom CSS for styling

const CustomCarousel = ({ data }) => {
  const [expanded, setExpanded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    let intervalId;
    if (!expanded) {
      // Automatically advance the carousel when not expanded
      intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === data.length - 1 ? 0 : prevIndex + 1
        );
      }, 2000); // Change the interval as needed
    }
    return () => clearInterval(intervalId);
  }, [expanded, data]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
     <div className="portfolio-item padd-15" key={data.id}>
        <div className="portfolio-item-inner shadow-dark">
            <div>
              <div className={`carousel ${expanded ? 'expanded' : 'unexpanded'}`} onClick={() => setExpanded(true)}>
                {expanded && data.length > 1 && (
                  <button className="prev" onClick={handlePrev}>
                    &#8592;
                  </button>
                )}
                <img src={data[currentIndex].image} alt={data[currentIndex].title} />
                {expanded && data.length > 1 && (
                  <button className="next" onClick={handleNext}>
                  &#8594;
                  </button>
                )}
              </div>
                {expanded && (
                  <span className="cross" onClick={() => setExpanded(false)}>
                  X
                  </span>
                )}
            </div>
        </div>
      </div>
    </>
  );
};

export default CustomCarousel;
