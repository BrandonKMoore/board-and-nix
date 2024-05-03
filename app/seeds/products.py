from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text
from random import choice, randint


# Adds a demo user, you can add other users here if you want
def seed_products():

    descriptions = [
        "Solid oak dining table with a smooth finish and intricate carved details.",
        "Cherry wood coffee table with a rich, reddish-brown hue and elegant curved legs.",
        "Pine wood bookshelf with a rustic, weathered look and adjustable shelves.",
        "Mahogany credenza with a glossy finish and ornate brass hardware.",
        "Walnut desk with a sleek, modern design and clean lines.",
        "Teak outdoor patio set with natural wood grain and weather-resistant properties.",
        "Birch wood bed frame with a minimalist style and sturdy construction.",
        "Maple wood dresser with a light, natural finish and ample storage.",
        "Bamboo dining chairs with a vintage rattan pattern and comfortable cushioned seats.",
        "Acacia wood console table with a distressed white paint finish and farmhouse charm."\
        ]

    names = [
        "Enchanted Oak Dining Table",
        "Whispering Willow Coffee Table",
        "Celestial Cherry Wood Dresser",
        "Serene Birch Bookcase",
        "Mystic Mahogany Console Table",
        "Twilight Teak Writing Desk",
        "Artisanal Acacia Coffee Table",
        "Rustic Maple Bed Frame",
        "Harvest Walnut Dining Chairs",
        "Sapphire Cedar Sideboard",
        "Midnight Birch Buffet",
        "Sterling Pine End Table",
        "Solstice Spruce Kitchen Island",
        "Stellar Sycamore Wardrobe",
        "Dreamcatcher Driftwood Bench",
        "Ember Ash Desk",
        "Harvest Moon Hickory Hutch",
        "Luna Alder Armoire",
        "Whimsical Cedar Chest",
        "Celestial Elm Bedside Table"
        ]

    sample_products = []

    for name in names:
        product = Product(
            user_id = randint(1, 3),
            name = name,
            description = choice(descriptions),
            price = randint(200, 1000) + 0.99,
            dimension_l = randint(60, 84) + (randint(0, 9) * 0.1),
            dimension_w = randint(24, 60) + (randint(0, 9) * 0.1),
            dimension_h = randint(24, 48) + (randint(0, 9) * 0.1),
            customizable = choice([True, False])
        )

        sample_products.append(product)

    db.session.add_all(sample_products)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
