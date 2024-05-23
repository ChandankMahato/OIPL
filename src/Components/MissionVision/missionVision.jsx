import React from 'react';
import './missionVision.css';
import Data from './iconData';

const MissionVisionValues = () => {
  return (
    <div className="mv-section">
      {Data.map((item, index) => (
        <div key={index} className="card">
          <i className="mission-vision-icon">
            {item.icon}
          </i>
          <h3 className="card-title">{item.title}</h3>
          {Array.isArray(item.desc) ? (
            <ul className="card-desc">
              {item.desc.map((descItem, i) => (
                <p key={i}>{descItem}</p>
              ))}
            </ul>
          ) : (
            <p className="card-desc">{item.desc}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default MissionVisionValues;
