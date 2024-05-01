from flask import Blueprint, request
from app.models import Review, db
from app.forms import ReviewForm

review_routes = Blueprint('reviews', __name__)

#Get all reviews
@review_routes.route('/', methods=['GET'])
def get_all_reviews():
  all_reviews = Review.query.all()

  all_reviews_response = [review.to_dict() for review in all_reviews]

  return ({'products': all_reviews_response})

#Create new review
@review_routes.route('/', methods=['POST'])
def create_review():
  reviewForm = ReviewForm()
  reviewForm['csrf_token'].data = request.cookies['csrf_token']


#Update review
#Delete Review
