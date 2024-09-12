import React from "react";
import "./Videocard.css";
import moment from "moment";
const Videocard = ({ hidesideb, elem, rtype }) => {
  let dynamicclass = hidesideb ? `videocard ` : "bigvideocard";
  rtype ? (dynamicclass += " changedir ") : null;

  function converter(val) {
    if (val >= 1000 && val < 1000000) {
      return `${Math.floor(val / 1000)}k`;
    } else if (val >= 1000000) {
      return `${Math.floor(val / 1000000)}M`;
    } else {
      return `${val}`;
    }
  }
  return (
    <div className={dynamicclass}>
      <img className="videoimg" src={elem.img} alt="" />
      <div className="changes">
      <div className="chaneldetails">
        <p className="chnltitle">{elem.des}</p>
        <span className="material-symbols-outlined">more_vert</span>
      </div>
      <div className="stats">
        <p className="chnlname">{elem.chnlname}</p>
        <div className="count">
          <span className="likes">{converter(elem.likes)} likes</span>
          <span>{converter(elem.views)} views</span>
          <span>{moment(elem.date).fromNow()}</span>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Videocard;
