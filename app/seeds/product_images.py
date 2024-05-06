from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text
from random import choice, randint


# Adds a demo user, you can add other users here if you want
def seed_product_images():

    urls = [
        "https://aa-project-3.s3.amazonaws.com/04f8fe59ec784b349398ac2002ac8645.jpeg",
        "https://aa-project-3.s3.amazonaws.com/0d0dd43e392d4bf1bba4be5e3f002c1a.jpeg",
        "https://aa-project-3.s3.amazonaws.com/23f9521fbcf4419eacc9cdea9f9b509c.jpeg",
        "https://aa-project-3.s3.amazonaws.com/3ff8ac011b7c446b88733f5512307e6f.jpeg",
        "https://aa-project-3.s3.amazonaws.com/8038fb5c5cb146bd9e5429bbe0bf176d.jpeg",
        "https://aa-project-3.s3.amazonaws.com/987b5cb4c41646ac9d854c248578e64e.jpeg",
        "https://aa-project-3.s3.amazonaws.com/9f547f9573bd432aac79f5e7cd6ed070.jpeg",
        "https://aa-project-3.s3.amazonaws.com/bd2266278a1449408ae2144c35299469.jpeg",
        "https://aa-project-3.s3.amazonaws.com/c608ef52e4f140d7a8727cbc0bc84884.jpeg",
        "https://aa-project-3.s3.amazonaws.com/f59acc81432740a2bec34412688d1fff.jpeg"
    ]

    product_images = []

    for idx in range(100):
        product_image = ProductImage(
            product_id = randint(1, 20),
            image_url = choice(urls),
            is_cover = choice([True, False])
            )

        product_images.append(product_image)

    for idx in range(1,21):
        product_image = ProductImage(
            product_id = idx,
            image_url = choice(urls),
            is_cover = True
            )

        product_images.append(product_image)

    db.session.add_all(product_images)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_product_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_images"))

    db.session.commit()
