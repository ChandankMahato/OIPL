import React from 'react';
import './bod.css';
import members from './data';

const BOD = () => {

  return (
    <section className="bod-section">
      {members.map((member, index) => (
        <div className="bod-card" key={index}>
          <img src={member.image} alt={member.name} className="bod-image" />
          <div className="bod-details">
            <h3 className="bod-name">{member.name}</h3>
            <h4 className="bod-title">{member.title}</h4>
            <p className="bod-description">{member.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default BOD;
