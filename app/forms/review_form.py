from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, BooleanField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Review

def max_stars(form, field):
  if field.data > 5:
    raise ValidationError('Reviews only can have up to 5 stars')

class ReviewForm(FlaskForm):
  user_id = IntegerField('user_id', nullable=False)
  product_id = IntegerField('product_id', nullable=False)
  body = StringField('body', nullable=False)
  stars = IntegerField('stars', nullable=False, validators=[max_stars])
