from flask import Blueprint, request
from app.models import Review, db
from app.forms import ReviewForm
from datetime import datetime

review_routes = Blueprint('reviews', __name__)

#Get all reviews
@review_routes.route('/', methods=['GET'])
def get_all_reviews():
  all_reviews = Review.query.all()

  # all_reviews_response = [review.to_dict() for review in all_reviews]
  all_reviews_response = {review.id:review.to_dict() for review in all_reviews}

  return ({'all_reviews': all_reviews_response})

#Create new review
@review_routes.route('/', methods=['POST'])
def create_review():
  reviewForm = ReviewForm()
  reviewForm['csrf_token'].data = request.cookies['csrf_token']
  if reviewForm.validate_on_submit():
    new_review = Review(
      user_id = reviewForm.data['user_id'],
      product_id = reviewForm.data['product_id'],
      body = reviewForm.data['body'],
      stars = reviewForm.data['stars'],
      created_at = datetime.now(),
      updated_at = datetime.now()
    )

    db.session.add(new_review)
    db.session.commit()

    return {'new_review': new_review.to_dict()}
  return reviewForm.errors, 401

#Update review
@review_routes.route('/<int:id>', methods=['PUT'])
def update_review(id):
  review = ''
  try:
    review = Review.query.filter(Review.id == id).one()
  except:
    return f'No product found with the id of {id}', 404

  reviewForm = ReviewForm()
  reviewForm['csrf_token'].data = request.cookies['csrf_token']
  if reviewForm.validate_on_submit():
    review.body = reviewForm.data['body']
    review.stars = reviewForm.data['stars']

    db.session.commit()

    return {'updated_review': review.to_dict()}
  return reviewForm.errors, 401

#Delete Review
@review_routes.route('/<int:id>', methods=['DELETE'])
def delete_review(id):
  review = ''
  try:
    review = Review.query.filter(Review.id == id).one()
  except:
    return f'No product found with the id of {id}', 404

  db.session.delete(review)
  db.session.commit()

  return {'response': f'Review number {review.id} was deleted successfully'}
