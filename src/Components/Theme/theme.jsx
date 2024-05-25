import React, { useEffect, useState } from "react";
import "./theme.css";
import ThemeIcons from './themeIcon';

const Theme = ({day, changeMode}) => {
  const [isSwitcherOpen, setSwitcherOpen] = useState(false);
  var color1= "#ec1839";
  var color2= "#ff5100";
  var color3= "#1d9200";
  var color4= "#003c9d";
  var color5= "#8f0064";

  var hover1= "#b50c25";
  var hover2= "#963102";
  var hover3= "#176100";
  var hover4= "#01235a";
  var hover5= "#510039";

  const changeColor = (color, hover) => {
    document.documentElement.style.setProperty("--skin-color", color);
    document.documentElement.style.setProperty("--btn-hover", hover);
  };

  const toggleSkinColor = () => {
    setSwitcherOpen((prevIsSwitcherOpen) => !prevIsSwitcherOpen);
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSwitcherOpen &&
        !event.target.closest(".style-switcher") &&
        !event.target.closest(".style-switcher-toggler")
      ) {
        setSwitcherOpen(false);
      }
    };

    const handleScroll = () => {
      if (isSwitcherOpen) {
        setSwitcherOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSwitcherOpen]);

  return (
    <div className={`style-switcher ${isSwitcherOpen ? "open" : ""}`}>
      <div className="style-switcher-toggler s-icon" onClick={toggleSkinColor}>
        <i>{ThemeIcons.Color}</i>
      </div>
      <div className="day-night s-icon" onClick={changeMode}>
        <i>{!day ? ThemeIcons.Sun : ThemeIcons.Moon}</i>
      </div>
      <h4>Theme Colors</h4>
      <div className="colors">
        <span className="color-1" onClick={() => changeColor(color1, hover1)}></span>
        <span className="color-2" onClick={() => changeColor(color2, hover2)}></span>
        <span className="color-3" onClick={() => changeColor(color3, hover3)}></span>
        <span className="color-4" onClick={() => changeColor(color4, hover4)}></span>
        <span className="color-5" onClick={() => changeColor(color5, hover5)}></span>
      </div>
    </div>
  );
};

export default Theme