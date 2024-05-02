from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, FileField
from app.models import ProductImage

class NewImageForm(FlaskForm):
  product_id = IntegerField('product_id', nullable=False)
  file_1 = FileField('files')
  files_2 = FileField('files')
  files_3 = FileField('files')
  files_4 = FileField('files')
  files_5 = FileField('files')
  image_url = StringField('image_url', nullable=False)
  is_cover = BooleanField('is_cover', default=True)
