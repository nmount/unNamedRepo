import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { postOneTweet } from "../../store/tweet.js";
import "./tweet-form.css";

export default function TweetForm() {
  const [title, newTitle] = useState("");
  const [content, newContent] = useState("");
//   const [errors, setErrors] = useState("");
  const userId = useSelector((state) => state.session.user.id);
  const dispatch = useDispatch();
  const history = useHistory();

  function submitForm(e) {
    e.preventDefault();

    //TODO: MAKE ERRORS, BUT IT WORKS
    try {
      dispatch(
        postOneTweet({
          title,
          userId,
          content,
        })
      );
      history.push("/tweets");
    } catch (e) {
      let error = new Error(e);
      console.log(error);
    }
  }

  return (
    <div className="parentTweetForm">
      <h1>create new tweet</h1>
      <form onSubmit={submitForm} className="newTweetForm">
        <div>
          <label htmlFor="title">Title </label>
          <input
            value={title}
            onChange={(e) => newTitle(e.target.value)}
            type="text"
            placeholder="Enter Title"
            className="textspot"
          />
        </div>
        <div>
          <label htmlFor="content">Enter Content: </label>
          <input
            value={content}
            onChange={(e) => newContent(e.target.value)}
            type="textarea"
            placeholder="Enter content here?"
            className="textspot"
          />
        </div>
        <div>
          <button className="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
