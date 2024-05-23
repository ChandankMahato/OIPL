import React from "react";
import "./feature.css";
import bulb from '../../Data/icons/Lightbulb.svg';
import perspective from '../../Data/icons/Perspective.svg';
import value from '../../Data/icons/HandCoins.svg';
import reliability from "../../Data/icons/Scales.svg";

const data = [
  { icon: bulb, title: "Market Knowledge", subtitle: "We have been in the market since 2020 gathering knowledge over time." },
  { icon: perspective, title: "Long Term Vision", subtitle: "As investors are our shareholders, we can focus on long-term results." },
  { icon: value, title: "Value Proposition", subtitle: "We focus on wise investment and create value for our customers." },
  { icon: reliability, title: "Reliability", subtitle: "We have experience. Knowledge in managing finances ensures reliability." },
];

const Feature = () => {
  return (
    <section className="feature-section">
      <div className="feature-left">
        <h3 className="feature-heading">Why Choose Us?</h3>
        <div className="feature-grid">
          {data.map((item, index) => (
            <div key={index} className="feature-item">
              <img src={item.icon} alt={`${item.title} icon`} className="feature-icon" />
              <div className="feature-content">
                <h4 className="feature-title">{item.title}</h4>
                <p className="feature-subtitle">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="feature-right">
        <h2 className="right-title">Ocimum Investment Pvt. Ltd</h2>
        <h4 className="right-subtitle">Investment Management Company</h4>
        <p className="right-desc">
          OIPL is one of the private-equity investment companies in Nepal. Innovating and working to achieve competitive financial returns and creating impact through investment in business and industry with the vision of strengthening the local economy.
        </p>
      </div>
    </section>
  );
};

export default Feature;
