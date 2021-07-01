import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteOneTweet, getTweetsByUserId } from "../../store/tweet";
import "./tweet.css";
// import UserPostForm from "../UserPost";

export default function Tweet({tweet}) {
    const loggedInUser = useSelector((state) => state.session.user);

    const dispatch = useDispatch();

    const onDelete = async (tweet) => {
        await dispatch(deleteOneTweet(tweet.id));
    };

    return (
        <div>
            <Link to={`/users/${tweet.user_id}`}></Link>
        </div>
    )
}
