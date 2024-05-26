import React, { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";
import { useLocation } from "react-router-dom";
import "./header.css";
import { useUserAuth } from "../../context/userAuthContext";
import { handleLogOut, handleSignIn } from "../../Utility/utils";
import logo_dark from '../../Data/logo_dark.png';
import logo_light from '../../Data/logo_light.png';

const Header = ({day, changeMode}) => {
  const { user, googleSignIn, logOut } = useUserAuth();
  const [hasShadow, setHasShadow] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const location = useLocation();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setShowMenu(false);
    window.scrollTo(0,0);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasShadow(true);
        setShowMenu(false);
      } else {
        setHasShadow(false);
        handleLinkClick('logo');
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`HeaderContainer ${hasShadow ? "shadow-header" : ""}`}>
      <div className="HeaderContent">
        <div className="Header-Left-Content">
          <div
            className="HeaderLink"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <HashLink
              className={activeLink === "about" ? 'nav-link active' : 'nav-link'}
              onClick={() => handleLinkClick('about')}
            >
              ABOUT
            </HashLink>
            {dropdownOpen && (
              <div className="DropdownMenu">
                <HashLink className="dropdown-item" smooth to="/introduction" onClick={() => handleLinkClick('introduction')}>Introduction</HashLink>
                <HashLink className="dropdown-item" smooth to="/mission-vision" onClick={() => handleLinkClick('mission-vision')}>Mission Vision</HashLink>
                <HashLink className="dropdown-item" smooth to="/bod" onClick={() => handleLinkClick('bod')}>BOD</HashLink>
                <HashLink className="dropdown-item" smooth to="/management" onClick={() => handleLinkClick('management')}>Management</HashLink>
              </div>
            )}
          </div>
          <div className="HeaderLink">
            <HashLink
              smooth to='/reports'
              className={activeLink === "report" ? 'nav-link active' : 'nav-link'}
              onClick={() => handleLinkClick('report')}
            >
              REPORTS
            </HashLink>
          </div>
          <div className="HeaderLink">
            <HashLink
              smooth to='/notices'
              className={activeLink === "notice" ? 'nav-link active' : 'nav-link'}
              onClick={() => handleLinkClick('notice')}
            >
              NOTICES
            </HashLink>
          </div>
        </div>
        <div className="HeaderLogo">
          <HashLink
            className="nav-link active"
            smooth to={`/#`}
            onClick={() => handleLinkClick('logo')}
          >
            <img src={day ? logo_light : logo_dark} alt='logo' />
          </HashLink>
        </div>
        <div className="Header-Right-Content">
          <div className="HeaderLink">
            <HashLink
              smooth to='/gallery'
              className={activeLink === "gallery" ? 'nav-link active' : 'nav-link'}
              onClick={() => handleLinkClick('gallery')}
            >
              GALLERY
            </HashLink>
          </div>
          <div className="HeaderLink">
            <HashLink
              smooth to='/career'
              className={activeLink === "career" ? 'nav-link active' : 'nav-link'}
              onClick={() => handleLinkClick('career')}
            >
              CAREER
            </HashLink>
          </div>
          <div className="HeaderLink">
            <HashLink
              smooth to='/#contact'
              className={activeLink === "contact" ? 'nav-link active' : 'nav-link'}
              onClick={() => handleLinkClick('contact')}
            >
              CONTACT
            </HashLink>
          </div>
        </div>
        <div className="HamburgerButton" onClick={toggleMenu}>
          {showMenu ? "✕" : "☰"}
        </div>
      </div>
      <div className={`MobileMenu ${showMenu ? "show" : ""}`}>
        <div className="HeaderLink">
          <HashLink
            smooth to=''
            className={activeLink === "about" ? 'nav-link active' : 'nav-link'}
            onClick={() => handleLinkClick('about')}
          >
            ABOUT
          </HashLink>
          <div className="DropdownMenu show">
            <HashLink className="dropdown-item" smooth to="/introduction" onClick={() => handleLinkClick('introduction')}>Introduction</HashLink>
            <HashLink className="dropdown-item" smooth to="/mission-vision" onClick={() => handleLinkClick('mission-vision')}>Mission Vision</HashLink>
            <HashLink className="dropdown-item" smooth to="/bod" onClick={() => handleLinkClick('bod')}>BOD</HashLink>
            <HashLink className="dropdown-item" smooth to="/management" onClick={() => handleLinkClick('management')}>Management</HashLink>
          </div>
        </div>
        <div className="HeaderLink">
          <HashLink
            smooth to='/reports'
            className={activeLink === "report" ? 'nav-link active' : 'nav-link'}
            onClick={() => handleLinkClick('report')}
          >
            REPORTS
          </HashLink>
        </div>
        <div className="HeaderLink">
          <HashLink
            smooth to='/notices'
            className={activeLink === "notice" ? 'nav-link active' : 'nav-link'}
            onClick={() => handleLinkClick('notice')}
          >
            NOTICES
          </HashLink>
        </div>
        <div className="HeaderLink">
          <HashLink
            smooth to='/gallery'
            className={activeLink === "gallery" ? 'nav-link active' : 'nav-link'}
            onClick={() => handleLinkClick('gallery')}
          >
            GALLERY
          </HashLink>
        </div>
        <div className="HeaderLink">
          <HashLink
            smooth to='/career'
            className={activeLink === "career" ? 'nav-link active' : 'nav-link'}
            onClick={() => handleLinkClick('career')}
          >
            CAREER
          </HashLink>
        </div>
        <div className="HeaderLink">
          <HashLink
            smooth to='/#contact'
            className={activeLink === "contact" ? 'nav-link active' : 'nav-link'}
            onClick={() => handleLinkClick('contact')}
          >
            CONTACT
          </HashLink>
        </div>
        
      </div>
      {location.pathname === "/admin" && (
        <div className="AuthButton">
          {user ? (
            <button className="btn" onClick={() => handleLogOut(logOut)}>
              Logout
            </button>
          ) : (
            <button className="btn" onClick={() => handleSignIn(googleSignIn)}>
              Signin
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
