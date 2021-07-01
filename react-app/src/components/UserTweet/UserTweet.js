import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editOneTweet } from "../../store/tweet";
import "./user-tweet.css";

export default function UserTweetForm({ tweet }) {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const onEdit = async (e) => {
    e.preventDefault();
    await dispatch(editOneTweet(tweet.id, content));
    setContent("");
  };

  return (
    <form className="tweet-content" onSubmit={onEdit}>
      <textarea
        value={content}
        placeholder="Edit Content"
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Submit Edit</button>
    </form>
  );
}
