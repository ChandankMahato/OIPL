import React from "react";
import Header from "../../Components/Header/header";
import "./errorPage.css";
import Theme from './../Theme/theme';
import { useNavigate } from "react-router-dom";
const ErrorPage = () => {

  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  }

  return (
    <>
        <Header/> 
        <Theme />
        <div className="error-page-container">
            <div className="error-content">
                404 Error Page 
            <div className="homeBtn">
              <button className="btn" onClick={goToHome}>Go To Home</button>
            </div>
            </div>
        </div>
    </>
  );
};

export default ErrorPage;
