const GET_TWEETS = "tweet/GET_TWEETS";
const DELETE_TWEET = "tweet/DELETE_TWEET";
const POST_TWEET = "tweet/POST_TWEET";
const EDIT_TWEET = "tweet/EDIT_TWEET";

const getTweets = (tweets) => ({
    type: GET_TWEETS,
    tweets
});

const postTweet = (tweet) => ({
    type: POST_TWEET,
    tweet
});

const deleteTweet = (tweet) => ({
    type: DELETE_TWEET,
    tweet
});

const editTweet = (tweet) => ({
    type: EDIT_TWEET,
    tweet
});

export const getAllTweets = () => async (dispatch) => {
    const res = await fetch('/api/tweets')
    const data = await res.json();

    console.log('------------------------', data)
    dispatch(getTweets(data.tweets));
}

export const getTweetsByUserId = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/tweets`);
    const data = await res.json();

    dispatch(getTweets(data.tweets));
}

export const postOneTweet = (data) => async (dispatch) => {
    const res = await fetch('api/tweets', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (res.ok) {
        const tweet = await res.json();

        dispatch(postTweet(tweet));
        return tweet;
    }
}

export const deleteOneTweet = (tweetId) => async (dispatch) => {
    const res = await fetch(`api/tweets/${tweetId}`, {
        method: "DELETE",
    });
    if (res.ok) {
        dispatch(deleteTweet(tweetId));
    }
};

export const editOneTweet = (tweetId, content) => async (dispatch) => {
    const res = await fetch(`/api/tweets/${tweetId}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(content)
    });

    if (res.ok) {
        const data = await res.json();

        dispatch(editTweet(data.tweet));
        return data;
    }
}



const initialState = {};

export default function tweetReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TWEETS: {
            const allTweets = {};
            console.log('ACTION!!!!!!!! TWEEEEEEEEETS',action.tweets)
            action.tweets.forEach((tweet) => {
                allTweets[tweet.id] = tweet;
            })
            return allTweets;
        }
        case POST_TWEET: {
            const newState = {...state};
            newState[action.newState] = action.newState;
            return newState;
        }
        case DELETE_TWEET: {
            const newState = {...state};
            delete newState[action.tweet];
            return newState;
        }
        case EDIT_TWEET: {
            const newState = {...state};
            const id = action.tweet.id;
            const newContent = newState[id];
            newState[id] = {...newContent, 'content':action.tweet.content};
            return newState;
        }
        default:
            return state;
    }
}
