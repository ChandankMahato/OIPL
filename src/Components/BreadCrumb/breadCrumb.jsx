import React from 'react';
import './breadCrumb.css';
import breadcrumbbg from './breadcrumbbg.png';

const Breadcrumb = ({title}) => {
  return (
    <div className="breadcrumb-container" style={{ backgroundImage: `url(${breadcrumbbg})` }}>
      <div className="breadcrumb-content">
        <h1>{title}</h1>
        <nav>
          <a href="/">Home</a> / {title}
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;
