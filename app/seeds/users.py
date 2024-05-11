from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from random import choice

fake = Faker('en_Us')

# Adds a demo user, you can add other users here if you want
def seed_users():
    seed_user_list = []

    demo_user = User(
        username='Demo',
        email='demo@aa.io',
        password='password',
        first_name='demo',
        last_name='user',
        phone='(615)559-9292',
        address='5482 Demonstration Ln. Nashville, TN',
        email_sub=True
        )

    seed_user_list.append(demo_user)

    for _ in range(10):
        new_user = demo = User(
            username=fake.user_name(),
            email=fake.email(),
            password='password',
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            phone=fake.basic_phone_number(),
            address=fake.address(),
            email_sub=choice([True, False])
        )

        seed_user_list.append(new_user)

    db.session.add_all(seed_user_list)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
