from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Tweet

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/tweets')
@login_required
def userTweets(id):
    tweets = Tweet.query.filter(Tweet.user_id == id).all()
    return {"tweets": [tweet.to_dict() for tweet in tweets]}
