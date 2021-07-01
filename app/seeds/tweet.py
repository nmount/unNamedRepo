from app.models import db, User, Tweet

def seed_tweets():
    seed1 = Tweet(user_id="1", title="title1", content="Content1")
    seed2 = Tweet(user_id="1", title="title2", content="Content2")
    seed3 = Tweet(user_id="1", title="title3", content="Content3")
    seed4 = Tweet(user_id="1", title="title4", content="Content4")
    seed5 = Tweet(user_id="1", title="title5", content="Content5")

    db.session.add(seed1)
    db.session.add(seed2)
    db.session.add(seed3)
    db.session.add(seed4)
    db.session.add(seed5)

    db.session.commit()

def undo_tweets():
    db.session.execute('TRUNCATE tweets RESTART IDENTITY CASCADE;')
    db.session.commit()
