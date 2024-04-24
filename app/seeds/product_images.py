from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text
from random import choice, randint


# Adds a demo user, you can add other users here if you want
def seed_product_images():

    urls = [
        "https://images.pexels.com/photos/447592/pexels-photo-447592.jpeg",
        "https://images.pexels.com/photos/3049121/pexels-photo-3049121.jpeg",
        "https://images.pexels.com/photos/276651/pexels-photo-276651.jpeg",
        "https://images.pexels.com/photos/3653849/pexels-photo-3653849.jpeg",
        "https://images.pexels.com/photos/238377/pexels-photo-238377.jpeg",
        "https://images.pexels.com/photos/3316923/pexels-photo-3316923.jpeg",
        "https://images.pexels.com/photos/2771921/pexels-photo-2771921.jpeg",
        "https://images.pexels.com/photos/4846437/pexels-photo-4846437.jpeg",
        "https://images.pexels.com/photos/11929031/pexels-photo-11929031.jpeg",
        "https://images.pexels.com/photos/2647714/pexels-photo-2647714.jpeg"
    ]

    product_images = []

    for idx in range(100):
        product_image = ProductImage(
            product_id = randint(0, 19),
            image_url = choice(urls),
            is_cover = choice([True, False])
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
