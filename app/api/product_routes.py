from flask import Blueprint, request
from app.models import Product, ProductImage, db
from app.forms import NewProductForm

product_routes = Blueprint('products', __name__)

#Get all products
@product_routes.route('/', methods=['GET'])
def get_all_products():
  all_products = Product.query.all()

  #product_images:self.product_images

  all_products_response = []
  for product in all_products:
    product_dict = product.to_dict()
    all_products_response.append(product_dict)

  return {'products': all_products_response}

#Get product by id
@product_routes.route('/<int:id>', methods=['GET'])
def get_product_by_id(id):
  product = ''
  #Catch if query isn't found in database
  try:
    product = Product.query.filter(Product.id == id).one()
  except:
    return f'No product found with the id of {id}', 404

  response_product = product.to_dict()

  return response_product

#Create new product
@product_routes.route('/', methods=['POST'])
def create_product():
  form = NewProductForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    new_product = Product(
      customizable = form.data['customizable'],
      name = form.data['name'],
      description = form.data['description'],
      price = form.data['price'],
      dimension_l = form.data['dimension_l'],
      dimension_w = form.data['dimension_w'],
      dimension_h = form.data['dimension_h']
    )

    new_image = ProductImage(
      image_url = request.form.get('image_url'),
    )

    new_product.product_images.append(new_image)

    db.session.add(new_product)
    db.session.commit()

    result = new_product.to_dict()
    # result['Images'] = [image.to_dict() for image in new_product.product_images]

    return {'new_product': result}
  return form.errors, 401

#Update existing product
@product_routes.route('/<int:id>', methods=['PUT'])
def update_product(id):
  product = ''
  try:
    product = Product.query.filter(Product.id == id).one()
  except:
    return f'No product found with the id of {id}', 404

  form = NewProductForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    product.name = form.data['name']
    product.customizable = form.data['customizable']
    product.description = form.data['description']
    product.price = form.data['price']
    product.dimension_l = form.data['dimension_l']
    product.dimension_w = form.data['dimension_w']
    product.dimension_h = form.data['dimension_h']

    if request.form.get('image_url'):
      new_image = ProductImage(
        product_id = product.id,
        image_url = request.form.get('image_url')
      )
      db.session.add(new_image)
      db.session.commit()
    else:
      db.session.commit()

    result = product.to_dict()

    return {'updated_product': result}
  return form.errors, 401

#Delete Product
@product_routes.route('/<int:id>', methods=['DELETE'])
def delete_product(id):
  product = Product.query.filter(Product.id == id).one()

  db.session.delete(product)
  db.session.commit()

  return {'response': f'{product.name} was deleted successfully'}
