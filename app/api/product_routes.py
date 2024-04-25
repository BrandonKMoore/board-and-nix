from flask import Blueprint, request
from app.models import Product, ProductImage, db
from ..forms import NewProductForm

product_routes = Blueprint('products', __name__)

@product_routes.route('/')
def get_all_products():
  all_products = Product.query.all()

  print(all_products[0].product_images)


  all_products_response = []
  for product in all_products:
    product_dict = product.to_dict()
    product_dict['Images'] = [image.to_dict() for image in product.product_images]
    all_products_response.append(product_dict)

  return {'products': all_products_response}

@product_routes.route('/', methods=['POST'])
def create_product():
  form = NewProductForm()
  print(request.form, form.data)
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    new_product = Product(
      customizable = form.data['customizable'],
      name = request.form.get('name'),
      description = request.form.get('description'),
      price = request.form.get('price'),
      dimension_l = request.form.get('dimension_l'),
      dimension_w = request.form.get('dimension_w'),
      dimension_h = request.form.get('dimension_h')
    )

    new_image = ProductImage(
      image_url = 'test.jpeg',
    )

    new_product.product_images.append(new_image)

    db.session.add(new_product)
    db.session.commit()

    result = new_product.to_dict()
    result['Images'] = [image.to_dict() for image in new_product.product_images]

    print(result)
    return result
  return form.errors, 401
