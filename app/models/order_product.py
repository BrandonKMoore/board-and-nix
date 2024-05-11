from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class ProductOrder(db.Model):
  __tablename__ = 'product_orders'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  order_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
  product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
  quantity = db.Column(db.Integer, default=1)
  custom_note = db.Column(db.String)
  created_at = db.Column(db.DateTime, default=datetime.now())
  updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

  order = db.relationship('Order', back_populates='product_orders')
  product = db.relationship('Product', back_populates='product_orders')

  def to_dict(self):
    return {
      'id': self.id,
      'order_id': self.order_id,
      'product_id': self.product_id,
      'quantity': self.quantity,
      'custom_note': self.custom_note
    }
