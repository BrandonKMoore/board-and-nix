from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, FileField
from app.models import ProductImage

class NewImageForm(FlaskForm):
  product_id = IntegerField('product_id', nullable=False)
  files = FileField('files')
  image_url = StringField('image_url', nullable=False)
  is_cover = BooleanField('is_cover', default=True)
