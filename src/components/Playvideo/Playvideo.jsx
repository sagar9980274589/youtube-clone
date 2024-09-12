import React, { useEffect, useRef, useState } from "react";
import "./Playvideo.css";
import Recvideocard from "./Recvideocard";
import moment from "moment";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
const Playvideo = () => {
  const [videodata,setvideodata]=useState(null);
  const [cmntdata,setcmntdata]=useState(null);
  const [rmddata,setrmddata]=useState([]);
  const {videoid, categoryid} = useParams();
  
  const API_KEY="AIzaSyAhRNdn1vuk-n7HG8D_TQNaLoIqNeMU5Y4";
  const url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoid}&key=${API_KEY}  `;
  const cmnturl=` https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=25&videoId=${videoid}&key=${API_KEY}`;
  

 
  let data3;
  let data4;
  let arr5;
  let tdata5=[];
  useEffect(()=>{
    (async function getrmddata() {
      let res5 = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${categoryid}&key=${API_KEY}`
      );
      let data5 = await res5.json();
      arr5 = [...data5.items];
  
      arr5.map((elem) => {
        tdata5.push({
          
  "img":elem.snippet.thumbnails.high.url,
  "chnlname":elem.snippet.channelTitle,
  "des":elem.snippet.title,
  "date":elem.snippet.publishedAt,
  "views":elem.statistics.viewCount,
  "likes":elem.statistics.likeCount,
  "catid":elem.snippet.categoryId,
  "videoId":elem.id
        });
      });
      setrmddata(tdata5);
    })()
 

  },[videodata])
   
 


  function converter(val) {
    if (val >= 1000 && val < 1000000) {
      return `${Math.floor(val / 1000)}k`;
    } else if (val >= 1000000) {
      return `${Math.floor(val / 1000000)}M`;
    } else {
      return `${val}`;
    }
  }



  
  useEffect(()=>{
    (async function getotherdata(){
let res4=await fetch(cmnturl);
 data4=await res4.json();
  
 
  setcmntdata(data4.items);
 





    })()


   

    
  },[videodata])
  
  
  
  useEffect(()=>{
    
    (async function getvideodata(){
let res3=await fetch(url);
 data3=await res3.json();
  
  console.log(data3);
  setvideodata({
"title":`${data3.items[0].snippet.title}`,
 "views":data3.items[0].statistics.viewCount,
 "likes":data3.items[0].statistics.likeCount,
 "date":`${data3.items[0].snippet.publishedAt}`,
 "description":`${data3.items[0].snippet.description}`,
 "commentcount":data3.items[0].statistics.commentCount,
 "chnlid":`${data3.items[0].snippet.channelId}`

  })
  })()

    


  

   



  },[videoid])
  
 
 
  return (
    <div className="playvideo">
      <div className="mainvideo">
        <div className="videosec">
          <iframe
            
            src={`https://www.youtube.com/embed/${videoid}?autoplay=1?si=y4rSJxDD47l1bzER`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <p className="videotitle">
             {videodata?videodata.title:""} 
          </p>
          <div className="videostats">
          <div className="helo">
          <p>{videodata?converter(videodata.views):""}</p>
          <span>{videodata?moment(videodata.date).fromNow():""}</span>
          </div>
          <div className="statsics">
          <span className="material-symbols-outlined">thumb_up</span>
          {videodata?converter(videodata.likes):""}
          <span className="material-symbols-outlined">thumb_down</span>
          <span className="material-symbols-outlined">share</span>
          <span className="material-symbols-outlined">download</span>
        </div>
        
        </div>
      
        </div>
        <div className="videodescription">
          <p className="heading">Description</p>
          <br/>
          <br/>
          {

            videodata?videodata.description.slice(0,250):""
          }
          
        </div>
        <hr/>
        <div className="commentssec">

          <p className="heading">{videodata?converter(videodata.commentcount):""} comments</p>
          <div className="usrcmt">
           { cmntdata?cmntdata.map((elem,idx)=>{
              return( 
              <div key={idx} className="wrapper">
              <div className="usrimg">
              <img src={`${cmntdata?elem.snippet.topLevelComment.snippet.authorProfileImageUrl:""}`} alt="usr" />
              </div>
              <div className="cmnt">
                <p className="authortitle ">{elem.snippet.topLevelComment.snippet.authorDisplayName}</p>
                <p className="fullcomment">{elem.snippet.topLevelComment.snippet.textDisplay}</p>
                <div>
                <span className="material-symbols-outlined">thumb_up</span>
          {elem.snippet.topLevelComment.snippet.likeCount}
          &nbsp; &nbsp; &nbsp; &nbsp;
          <span className="material-symbols-outlined">thumb_down</span>
          </div>
              </div>
              </div>
              
              )}) :""
          }


          </div>
        </div>
      </div>
      <div className="recommend">
      
      { rmddata?
        rmddata.slice(0,50).map((elem,idx) => {
          return   (<Link key={idx} to={`/video/${elem.catid}/${elem.videoId}`}><Recvideocard elem={elem}/></Link>)
        }):null
      } 
       
      </div>
    </div>
  );
};

export default Playvideo;
