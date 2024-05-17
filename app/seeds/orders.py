from app.models import db, Order, environment, SCHEMA
from sqlalchemy.sql import text
from random import choice, randint


def seed_orders():
  sample_orders = []

  for _ in range(100):
    order = Order(
      user_id = randint(1, 11),
      paid = choice([True, False])
    )

    sample_orders.append(order)

  db.session.add_all(sample_orders)
  db.session.commit()



def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders"))

    db.session.commit()
