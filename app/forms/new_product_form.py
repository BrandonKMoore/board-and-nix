from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, BooleanField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Product

def product_exist(form, field):
  new_name = field.data
  name = Product.query.filter(Product.name == new_name).first()
  if name:
    raise ValidationError('A product with the provided name already exist')

class NewProductForm(FlaskForm):
  user_id = IntegerField('user_id', validators=[DataRequired()])
  name = StringField('name', validators=[DataRequired(), product_exist])
  description = StringField('description', validators=[DataRequired()])
  price = DecimalField('price', places=2, validators=[DataRequired()])
  dimension_l = DecimalField('dimension_l', places=1)
  dimension_w = DecimalField('dimension_w', places=1)
  dimension_h = DecimalField('dimension_h', places=1)
  customizable = BooleanField('customizable')
