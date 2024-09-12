import React, { useState } from "react";
import "./Side.css";
const Side = ({ hidesideb, setdata }) => {
  let cid = 0;
  const API_KEY = "AIzaSyAhRNdn1vuk-n7HG8D_TQNaLoIqNeMU5Y4";
  function setcid() {
    if (catogary == "Trending") cid = 28;
    else if (catogary == "Shopping") cid = 22;
    else if (catogary == "Music") cid = 30 ;
    else if (catogary == "Movies") cid = 20;
    else if (catogary == "Gaming") cid = 10 ;
    else if (catogary == "News") cid = 17;
    else if (catogary == "Sports") cid = 25;
  }
  let tdata1 = [];
  let arr1;
  async function changedata() {
    let res1 = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${cid}&key=${API_KEY}`
    );
    console.log("fetched in side");
    let data1 = await res1.json();
    arr1 = [...data1.items];

    arr1.map((elem) => {
      tdata1.push({
        img: elem.snippet.thumbnails.high.url,
        chnlname: elem.snippet.channelTitle,
        des: elem.snippet.title,
        date: elem.snippet.publishedAt,
        views: elem.statistics.viewCount,
        likes: elem.statistics.likeCount,
      });
    });
    setdata(tdata1);
  }
  const [catogary, setcatogary] = useState("");
  return (
    <div className={hidesideb ? ` hideside` : "side"}>
      <div className="options">
        <span className="material-symbols-outlined oics">home</span>
        <p> Home</p>
      </div>
      <div className="options">
        <span className="material-symbols-outlined">animated_images</span>
        <p> Shorts</p>
      </div>
      <div className="options">
        <span className="material-symbols-outlined">subscriptions</span>
        <p> Subscriptions</p>
      </div>
      <hr />
      <span className="heading">Explore</span>
      <div
        onClick={() => {
          setcatogary("Trending");
          setcid();
          changedata();
        }}
        className={catogary == "Trending" ? "options selected" : "options"}
      >
        <span
          className={
            catogary == "Trending"
              ? "material-symbols-outlined selected"
              : "material-symbols-outlined"
          }
        >
          local_fire_department
        </span>
        <p> Trending</p>
      </div>
      <div
        onClick={() => {
          setcatogary("Shopping");
          setcid();
          changedata();
        }}
        className={catogary == "Shopping" ? "options selected" : "options"}
      >
        <span
          className={
            catogary == "Shopping"
              ? "material-symbols-outlined selected"
              : "material-symbols-outlined"
          }
        >
          shopping_bag
        </span>
        <p> Shopping</p>
      </div>
      <div
        onClick={() => {
          setcatogary("Music");
          setcid();
          changedata();
        }}
        className={catogary == "Music" ? "options selected" : "options"}
      >
        <span
          className={
            catogary == "Music"
              ? "material-symbols-outlined selected"
              : "material-symbols-outlined"
          }
        >
          music_note
        </span>
        <p> Music</p>
      </div>
      <div
        onClick={() => {
          setcatogary("Movies");
          setcid();
          changedata();
        }}
        className={catogary == "Movies" ? "options selected" : "options"}
      >
        <span
          className={
            catogary == "Movies"
              ? "material-symbols-outlined selected"
              : "material-symbols-outlined"
          }
        >
          movie
        </span>
        <p> Movies</p>
      </div>
      <div
        onClick={() => {
          setcatogary("Gaming");
          setcid();
          changedata();
        }}
        className={catogary == "Gaming" ? "options selected" : "options"}
      >
        <span
          className={
            catogary == "Gaming"
              ? "material-symbols-outlined selected"
              : "material-symbols-outlined"
          }
        >
          stadia_controller
        </span>
        <p> Gaming</p>
      </div>
      <div
        onClick={() => {
          setcatogary("News");
          setcid();
          changedata();
        }}
        className={catogary == "News" ? "options selected" : "options"}
      >
        <span
          className={
            catogary == "News"
              ? "material-symbols-outlined selected"
              : "material-symbols-outlined"
          }
        >
          news
        </span>
        <p> News</p>
      </div>
      <div
        onClick={() => {
          setcatogary("Sports");
          setcid();
          changedata();
        }}
        className={catogary == "Sports" ? "options selected" : "options"}
      >
        <span
          className={
            catogary == "Sports"
              ? "material-symbols-outlined selected"
              : "material-symbols-outlined"
          }
        >
          trophy
        </span>
        <p> Sports</p>
      </div>
      <hr />
      <div className="subslist">
        <span className="heading">Subscriptions</span>
        <div className="options">
          <img src=""></img>
          <p>channel name</p>
        </div>
        <div className="options">
          <img src=""></img>
          <p>channel name</p>
        </div>
        <div className="options">
          <img src=""></img>
          <p>channel name</p>
        </div>
      </div>
    </div>
  );
};

export default Side;
