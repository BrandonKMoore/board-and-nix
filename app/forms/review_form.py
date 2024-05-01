from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, BooleanField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Review

def max_stars(form, field):
  if field.data > 5 or field.data < 1:
    raise ValidationError('Reviews only can have 1 to 5 stars')

class ReviewForm(FlaskForm):
  user_id = IntegerField('user_id', validators=[DataRequired()] )
  product_id = IntegerField('product_id', validators=[DataRequired()] )
  body = StringField('body', validators=[DataRequired()] )
  stars = IntegerField('stars', validators=[DataRequired(), max_stars])
