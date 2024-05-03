from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, BooleanField, FileField, MultipleFileField
from wtforms.validators import DataRequired, ValidationError
from app.models import Product

def product_exist(form, field):
  new_name = field.data
  name = Product.query.filter(Product.name == new_name).first()
  if name:
    raise ValidationError('A product with the provided name already exist')

class NewProductForm(FlaskForm):
  name = StringField('name', validators=[DataRequired()])
  description = StringField('description', validators=[DataRequired()])
  price = DecimalField('price', places=2, validators=[DataRequired()])
  dimension_l = DecimalField('dimension_l', places=1)
  dimension_w = DecimalField('dimension_w', places=1)
  dimension_h = DecimalField('dimension_h', places=1)
  customizable = BooleanField('customizable')
  image_url = MultipleFileField('image_url')
  # image_url = FileField('image_url', nullable=False)
  # is_cover = BooleanField('is_cover', default=True)
  # *temp* image_url and is_cover is temporarily on this form until S3 is implemented
