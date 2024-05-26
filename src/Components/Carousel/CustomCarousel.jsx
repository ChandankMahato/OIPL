import React, { useState, useEffect } from 'react';
import './CustomCarousel.css'; // Import your custom CSS for styling

const CustomCarousel = ({ data, path }) => {
  const [expanded, setExpanded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
console.log('hello');
  useEffect(() => {
    console.log('hello123');
    let intervalId;
    if (!expanded) {
      intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === data.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
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
     <div className="carousel-item" key={data.id}>
        <div className="carousel-item-inner shadow-dark">
            <div>
              <div className={`carousel ${expanded ? 'expanded' : 'unexpanded'}`} onClick={() => setExpanded(true)}>
                {expanded && data.length > 1 && (
                  <button className="prev" onClick={handlePrev}>
                    &#8592;
                  </button>
                )}
                {data.map((item, index) => (
                  <img
                    key={index}
                    src={item.image}
                    alt={item.title}
                    className={currentIndex === index ? 'active' : ''}
                  />
                ))}
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
        {
          path === "notice" ?  
          <div className='notice-download-btn'>
                <button
                  className="download-button" 
                  onClick={() => {
                    window.open(data[0].pdfUrl, '_blank');
                  }}
                >
                  Download Notice
                </button>
          </div> : ''
        }
      </div>
    </>
  );
};

export default CustomCarousel;



