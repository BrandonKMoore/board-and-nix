from .db import db, environment, SCHEMA
from datetime import datetime

class Product(db.Model):
  __tablename__ = 'products'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100), nullable=False, unique=True)
  description = db.Column(db.String, nullable=False)
  price = db.Column(db.Float, nullable=False)
  dimension_l = db.Column(db.Float)
  dimension_w = db.Column(db.Float)
  dimension_h = db.Column(db.Float)
  customizable = db.Column(db.Boolean, default=False)
  created_at = db.Column(db.DateTime, default=datetime.now())
  updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

  product_images = db.relationship('ProductImage', back_populates='product', cascade="all, delete-orphan")

  def get_dimensions(self):
    if self.dimension_l and self.dimension_l and self.dimension_w:
      return f'{self.dimension_l}" x {self.dimension_w}" x {self.dimension_h}"'

  def to_dict(self):
    images = [image.to_dict() for image in self.product_images]
    return {
      'id': self.id,
      'name': self.name,
      'description': self.description,
      'price': self.price,
      'dimension_l': self.dimension_l,
      'dimension_w': self.dimension_w,
      'dimension_h': self.dimension_h,
      'customizable': self.customizable,
      'Images': images,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }
