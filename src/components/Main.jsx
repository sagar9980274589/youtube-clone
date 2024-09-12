import React from "react";
import "./Main.css";
import Videocard from "./Videocard";
import { Link } from "react-router-dom";
const Main = ({hidesideb,data}) => {
  
  return (
    <div className="main">
      
      {
        data.map((elem,idx)=>{
        
return   <Link key={idx} to={`/video/${elem.catid}/${elem.videoId}`}><Videocard  hidesideb={hidesideb} elem={elem}/></Link>
        })
      }


    </div>
  );
};

export default Main;
