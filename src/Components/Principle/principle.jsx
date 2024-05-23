import React from "react";
import "./principle.css";
import principleData from "./iconData";
const Principle = () => {

    return (
        <section className="principle principleSection" id="principle">
            <div className="principleContainer">
                <h3 className="principleTitle">Our Investment Principles</h3>
                <div className="principle-content padd-15">
                    <div className="row">
                        {
                            principleData.map((data) => (
                            <div className="principle-item padd-15">
                                <div className="principle-item-inner">
                                    <div className="icon">
                                    <i className="fa">{data.icon}</i>
                                    </div>
                                    <h2>{data.title}</h2>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Principle;
