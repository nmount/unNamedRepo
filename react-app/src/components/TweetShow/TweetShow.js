import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { getAllTweets } from "../../store/tweet";
import { useDispatch, useSelector } from "react-redux";
import Tweet from "../Tweet";
// import "./tweet-show.css";

function TweetShow() {
  const dispatch = useDispatch();
  const stateTweets = useSelector((state) => state.tweetReducer);

  useEffect(() => {
    dispatch(getAllTweets());
  }, [dispatch]);

  const tweetComponents = Object.values(stateTweets)?.map((tweet) => {
    return (
      <div>
        {console.log('TWEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEET', tweet)}
        <Tweet key={tweet.id} tweet={tweet} />
        <p>{tweet.title}</p>
        <p>{tweet.content}</p>
      </div>
    );
  });


  return (
    <>
      <h1>Welcome to the tweets show page</h1>
      {console.log('tweet components\n\n', tweetComponents)}
      <div className="tweet-container">{tweetComponents}</div>
    </>
  );
}

export default TweetShow;
