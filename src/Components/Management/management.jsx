import React from 'react';
import './management.css';
import members from './data';

const Management = () => {

  return (
    <>
        <section className="management-section">
        {members.map((member, index) => (
            <div className="management-card" key={index}>
            <img src={member.image} alt={member.name} className="management-image" />
            <div className="management-details">
                <h3 className="management-name">{member.name}</h3>
                <h4 className="management-title">{member.title}</h4>
            </div>
            </div>
        ))}
        </section>
        <div className='shareholders-container'>
            <div className="shareholders-section-title">
                <h2>Shareholders</h2>
            </div>
            <div className="shareholder-section">
                {members.map((member, index) => (
                    <div className="shareholder-card" key={index}>
                    <img src={member.image} alt={member.name} className="shareholder-image" />
                    <div className="shareholder-details">
                        <h3 className="shareholder-name">{member.name}</h3>
                    </div>
                    </div>
                ))}
            </div>
        </div>
    </>
  );
};

export default Management;
