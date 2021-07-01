import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteOneTweet, getTweetsByUserId } from "../../store/tweet";
// import UserPostForm from "../UserPost";
// import Post from "../Post";
import Tweet from '../Tweet'
import "./user.css";

function User() {
  const [user, setUser] = useState({});
  // const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();

  const userTweets = useSelector((state) => state.tweetReducer);
  const loggedInUser = useSelector((state) => state.session.user);

  // Notice we use useParams here instead of getting the params
  // From props.
  const { userId } = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();

      setUser(user);
      await dispatch(getTweetsByUserId(userId));
    })();
  }, [userId, dispatch]);

  if (!user) {
    return null;
  }

  const onDelete = async (tweet) => {
    await dispatch(deleteOneTweet(tweet.id));
  };

  // const onEdit = () => {
  //   setEdit((prevState) => !prevState);
  // };

  const tweetComponents = Object.values(userTweets).map((tweet) => {
    return (
      <div>
        <div>
          <Tweet tweet={tweet} />
          {/* {loggedInUser.id == userId && (
            <>
              {edit == true && <UserPostForm post={post} />}
              <div className="crud-buttons">
                <button onClick={() => onEdit(post)}>
                  {edit == true ? "Done Editing?" : "Edit Post"}
                </button>
                <button onClick={() => onDelete(post)}>Delete Post</button>
              </div>
            </>
          )} */}
        </div>
      </div>
    );
  });
  return (
    <>
      <h1>{user.username}'s Tweets</h1>
      <div className="post-container">{tweetComponents}</div>
    </>
  );
}

export default User;
