from app.models import db, OrderProduct, environment, SCHEMA
from sqlalchemy.sql import text
from random import choice, randint

# order_id, product_id, quantity, customer_note

def seed_order_products():
  custom_notes = [
    None,
    "",
    "I'm looking for a solid oak dining table with a distressed finish, seating for eight, and a built-in leaf extension for larger gatherings.",
    "Can you craft a minimalist walnut bed frame with integrated storage drawers underneath, designed to fit a queen-sized mattress?",
    "I'd like a custom-made cherry wood writing desk with intricate hand-carved detailing on the legs and a leather writing surface.",
    "Could you create a set of matching mahogany bookcases with adjustable shelves to display my extensive book collection?",
    "I need a reclaimed barn wood coffee table with a live edge and hairpin legs, featuring a hidden compartment for storing magazines and remote controls.",
    "Can you construct a cedar outdoor bench with a curved backrest and armrests, treated for weather resistance and durability?",
    "I'm interested in a maple kitchen island with a butcher block top, built-in wine rack, and hanging pot rack overhead for my culinary workspace.",
    "Could you design a custom teak wardrobe with sliding doors, mirrored panels, and built-in LED lighting for my modern bedroom?",
    "I'd like a set of custom-made cherry wood dining chairs with upholstered seats in a durable, stain-resistant fabric, comfortable for long dinners.",
    "Can you craft a unique live edge entryway table from a single slab of black walnut, showcasing the natural beauty of the wood grain?"
    ]

  sample_order_products = []

  for _ in range(600):
    order_product = OrderProduct(
      order_id = randint(1, 100),
      product_id = randint(1, 20),
      quantity = randint(1, 4),
      custom_note = choice(custom_notes)
    )

    sample_order_products.append(order_product)

  db.session.add_all(sample_order_products)
  db.session.commit()
  


def undo_order_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.order_products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM order_products"))

    db.session.commit()
