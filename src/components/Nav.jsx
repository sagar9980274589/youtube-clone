import React, { useState } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
const nav = ({hideside}) => {
  const [query,setquery]=useState("");

  function handleQuery(e){
setquery(e.target.value);
  }
  function clearquery(){
    setquery("");
  }
  
  return (
    <div className="nav">
      <div className="logo">
        <span onClick={hideside} className="material-symbols-outlined menu">menu</span>
       <Link to='/'><img src="logo.png" alt="" /></Link> 
      </div>
         <div className="search">  
        <input type="text" onChange={handleQuery} value={query} placeholder="search" />
        <Link to={`/searchResult/${query}`}><span onClick={clearquery}  className="material-symbols-outlined mag">search</span></Link>
        <span className="material-symbols-outlined mic" >mic</span>
      </div>
      <div className="icons">
        <span className="material-symbols-outlined ics">upload</span>
        <span className="material-symbols-outlined ics">notifications</span>
        <div className="profile">
            S
        </div>
      </div>
    </div>
  );
};

export default nav;
