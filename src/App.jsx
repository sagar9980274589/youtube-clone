import { useEffect, useState } from "react";

import "./App.css";
import Nav from "./components/Nav";
import Side from "./components/side";
import Main from "./components/main";
import SearchResult from "./components/SearchResult/SearchResult";
import Playvideo from "./components/Playvideo/Playvideo";
import { BrowserRouter as Router, Routes,Route,Link } from 'react-router-dom';
function App() {
  

  let tdata=[];
  const [data,setdata]=useState([]);
   const API_KEY="AIzaSyAhRNdn1vuk-n7HG8D_TQNaLoIqNeMU5Y4";
  useEffect(() => {
    (async function getdata() {
      let res = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&key=${API_KEY}`
      );
      console.log("fetched in app");
      let data =await res.json();
let arr=[...data.items];

      arr.map((elem)=>{
tdata.push({
  "img":elem.snippet.thumbnails.high.url,
  "chnlname":elem.snippet.channelTitle,
  "des":elem.snippet.title,
  "date":elem.snippet.publishedAt,
  "views":elem.statistics.viewCount,
  "likes":elem.statistics.likeCount,
  "catid":elem.snippet.categoryId,
  "videoId":elem.id
 
});
      })
      setdata(tdata);
    })();
 
  }, []);
 
  const [hidesideb, sethidesideb] = useState(false);
  function hideside() {
    sethidesideb((prev) => {
      return !prev;
    });
   
  }
  
  
 

  return (
  
    <Router>
    <div className="app">

      <Nav hideside={hideside} />
      <div className="content">
        
      
        <Routes>
        <Route path="/" element={<><Side hidesideb={hidesideb} setdata={setdata}/><Main  hidesideb={hidesideb} data={data}/></>} />
        <Route path="/video/:categoryid/:videoid" element={<Playvideo />} />
        <Route path="/searchResult/:query" element={<SearchResult  hidesideb={hidesideb}/>} />
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
