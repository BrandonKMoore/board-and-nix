from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from random import choice, randint


# Adds a demo user, you can add other users here if you want
def seed_reviews():

  review_body = [
    "Absolutely love my new wood dining table - the craftsmanship is impeccable and the woodgrain is stunning.",
    "The wood bookshelf is perfect for organizing and displaying my favorite books and collectibles.",
    "The wood coffee table is the perfect addition to my living room - sleek design and sturdy construction.",
    "The wood bed frame is not only beautiful but also incredibly comfortable - a great investment.",
    "The wood dresser has ample storage space and looks elegant in my bedroom.",
    "I am in love with my new wood vanity - the mirror and drawers make getting ready a breeze.",
    "The wood desk is a game-changer for my home office setup - stylish and functional.",
    "The wood bench adds a touch of rustic charm to my entryway and provides convenient seating.",
    "The wood TV stand is a great fit for my media room - spacious and well-crafted.",
    "The wood bar cart is a classy addition to my entertainment area - perfect for serving drinks to guests.",
    "Sturdy and well-crafted, this dining table exceeded my expectations.",
    "The rustic charm of this coffee table adds warmth to my living room.",
    "The intricate carvings on this chair make it a standout piece in my home.",
    "The chest of drawers is spacious and beautifully designed.",
    "I love the natural finish of this bookshelf, it fits perfectly in my study.",
    "The bar cart is not only practical but also adds a touch of sophistication to my space.",
    "The wood grain on this console table is absolutely stunning.",
    "These solid wood nightstands are the perfect addition to my bedroom.",
    "The quality of craftsmanship on this desk is evident in every detail.",
    "The dresser is both functional and stylish, providing ample storage.",
    "The outdoor patio set is durable and withstood harsh weather conditions.",
    "The wood bench is the ideal blend of comfort and elegance for my entryway.",
    "The armchair is a cozy spot to relax with its plush cushions and sturdy frame.",
    "This wood buffet is a timeless piece that enhances the sophistication of my dining room.",
    "The bar stools are not only comfortable but also have a modern design aesthetic.",
    "The wood bed frame is a solid and sturdy foundation for my mattress.",
    "The kitchen island is a versatile addition to my cooking space, providing extra storage and prep area.",
    "The accent table is a unique and eye-catching piece that complements my existing decor.",
    "The wooden bench adds a touch of charm to my garden, perfect for enjoying the outdoors.",
    "The rocking chair is a classic piece that brings a sense of nostalgia to my porch."
  ]

  sample_reviews = []

  for idx in range(100):
    review = Review(
      user_id = randint(1, 3),
      product_id = randint(1, 20),
      body = choice(review_body),
      stars = randint(1, 5)
    )

    sample_reviews.append(review)

  db.session.add_all(sample_reviews)
  db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
