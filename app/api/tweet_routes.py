from app.api.user_routes import user
from flask import Blueprint, request, session
from flask_login import login_required, current_user
from app.models import db, Tweet
from app.forms import TweetForm

tweet_routes = Blueprint("tweets", __name__)

@tweet_routes.route("")
@login_required
def get_tweets():
    tweets = Tweet.query.all()
    return {"tweets": [tweet.to_dict() for tweet in tweets]}


@tweet_routes.route("", methods=["POST"])
@login_required
def add_tweet():
    form = TweetForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        tweet = Tweet(
            user_id=current_user.id,
            title=form.data['title'],
            content=form.data['content']
        )
        db.session.add(tweet)
        db.session.commit()
    if not form.errors:
        return "no errors"
    return {"errors": form.errors}


@tweet_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_tweet(id):
    tweet = Tweet.query.get(id)
    db.session.delete(tweet)
    db.session.commit()
    return {'message': 'success'}



@tweet_routes.route("/<int:id>", methods=["PATCH"])
@login_required
def edit_tweet(id):
    print("Made it into the edit_tweet route")
    tweet = Tweet.query.get(id)
    request_body = request.get_json()
    tweet.content = request_body
    db.session.commit()
    return {'tweet': tweet.to_dict()}
