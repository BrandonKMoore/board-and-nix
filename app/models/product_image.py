from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class ProductImage(db.Model):
  __tablename__ = 'product_images'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
  image_url = db.Column(db.String, nullable=False)
  is_cover = db.Column(db.Boolean, default=True)
  created_at = db.Column(db.DateTime, default=datetime.now())
  updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

  product = db.relationship('Product', back_populates='product_images')

  def to_dict(self):
    return {
      'id': self.id,
      'product_id': self.product_id,
      'image_url': self.image_url,
      'is_cover': self.is_cover,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }
