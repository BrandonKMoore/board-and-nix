from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Order(db.Model):
  __tablename__ = 'orders'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  paid = db.Column(db.Boolean, default=False)
  created_at = db.Column(db.DateTime, default=datetime.now())
  updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

  user = db.relationship('User', back_populates='orders')
  order_products = db.relationship('ProductOrder', back_populates='order', cascade="all, delete-orphan")

  def to_dict(self):
    return {
      'id': self.id,
      'user': self.user_id,
      'paid': self.paid,
      'order_date': self.created_at
    }
