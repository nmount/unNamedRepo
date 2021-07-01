import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteOneTweet, getTweetsByUserId } from "../../store/tweet";
import "./tweet.css";
import UserTweetForm from "../UserTweet";

export default function Tweet({tweet}) {
    const [edit, setEdit] = useState(false);
    const loggedInUser = useSelector((state) => state.session.user);

    const dispatch = useDispatch();

    const onEdit = () => {
        setEdit((prevState) => !prevState)
    };

    const onDelete = async (tweet) => {
        dispatch(deleteOneTweet(tweet.id));
    };

    return (
        <div>
            <div>
        {loggedInUser.id == tweet.user_id && (
          <>
            {edit == true && <UserTweetForm tweet={tweet} />}
            <div className="crud-buttons">
              <button onClick={() => onEdit(tweet)}>
                {edit == true ? "Done Editing?" : "Edit Tweet"}
              </button>
              <button onClick={() => onDelete(tweet)}>Delete Tweet</button>
            </div>
          </>
        )}
            </div>
        </div>
    );
}
