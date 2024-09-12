import React, { useEffect, useState } from "react";
import "./SearchResult.css";
import Nav from "../Nav";
import Main from "../main";
import { useParams } from "react-router-dom";





const SearchResult = ({ hidesideb}) => {
  const { query } = useParams();

  const API_KEY = "AIzaSyAhRNdn1vuk-n7HG8D_TQNaLoIqNeMU5Y4";
  let tdata = [];
  const [SearchData, setSearchData] = useState([]);

  useEffect(() => {
    (async function getSearchResult() {
      let res = await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${query}&key=${API_KEY}`
      );
      
      console.log("fetched 1 in search");
      let data = await res.json();

      let arr = [...data.items];
      
    
 arr.map((elem, idx) => {
      
      
          tdata.push({
            img: elem.snippet.thumbnails.high.url,
            chnlname: elem.snippet.channelTitle,
            des: elem.snippet.thumbnails.title,
            date: elem.snippet.publishedAt,
            videoId: elem.id.videoId,
            views: "",
            likes: "",
            catid:17 ,
          });
        
      });
      console.log(tdata);

      setSearchData(tdata);
    })();
  }, [query]);

  return (
    <div>
      <Main hidesideb={true} data={SearchData}  />
    </div>
  );
};

export default SearchResult;
