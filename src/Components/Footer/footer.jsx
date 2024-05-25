import React from 'react';
import './footer.css';
import contactData from "../../Components/Contact/data";
import addressData from './iconData';
import { HashLink } from 'react-router-hash-link';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-column">
        <div className='columnContent'>
          <h2>Quick Links</h2>
          <ul>
            <HashLink smooth to='/introduction' onClick={() => {window.scrollTo(0,0);}}><li>About</li></HashLink>
            <HashLink smooth to='/#contact' onClick={() => {window.scrollTo(0,0);}}><li>Contact</li></HashLink>
            <HashLink smooth to='/career' onClick={() => {window.scrollTo(0,0);}}><li> <li>Career</li></li></HashLink>
            <HashLink smooth to='/gallery' onClick={() => {window.scrollTo(0,0);}}><li>  <li>Gallery</li></li></HashLink>
            <HashLink smooth to='/reports' onClick={() => {window.scrollTo(0,0);}}><li>Reports</li></HashLink>
          </ul>
        </div>
      </div>
      <div className="footer-column">
        <div className='columnContent'>
          <h2>Useful Links</h2>
          <ul>
            <a href='https://www.sebon.gov.np/' target='_blank' rel="noreferrer"><li>SEBON</li></a>
            <a href='https://www.nepalstock.com.np/' target='_blank' rel="noreferrer"><li>NEPSE</li></a>
            <a href='https://cdsc.com.np/' target='_blank' rel="noreferrer"><li>CDSC</li></a>
            <a href='https://www.mof.gov.np/' target='_blank' rel="noreferrer"><li>MOF</li></a>
            <a href='https://www.nrb.org.np/' target='_blank' rel="noreferrer"><li>NRB</li></a>
          </ul>
        </div>
      </div>
      <div className="footer-column">
        <div className='columnContent'>
          <h2>Contacts</h2>
          <ul>
            {
              addressData.map((data) => (
                <div className='address'>
                  <i className='icon'>{data.icon}</i>
                  <p className='addressText'>{data.title}</p>
                </div>
              ))
            }
          </ul>
        </div>
      </div>
      <div className="footer-column">
       <div className='columnContent'>
          <h2>Get in Touch</h2>
          <ul className="social-icons">
              {contactData.map((data) => (
                  <div className="social-info-item padd-15" key={data.id}>
                      <a href={data.link} target="_blank" rel="noopener noreferrer">
                          <div className="icon">
                          <i className="fa">{data.icon}</i>
                          </div>
                      </a>
                  </div>
              ))}
          </ul>
       </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright &#9400; 2024 Ocimum Investment Pvt. Ltd.</p>
      </div>
    </footer>
  );
};

export default Footer;
