from flask import Blueprint, request, jsonify
from app.models import Order, OrderProduct, db
# from app.forms import ReviewForm
from datetime import datetime

order_routes = Blueprint('orders', __name__)

#Get all orders
@order_routes.route('/', methods=['GET'])
def get_all_orders():
  all_orders = Order.query.all()

  all_orders = {order.id: order.to_dict() for order in all_orders}

  return {'orders': all_orders}

#Get order by id
@order_routes.route('/<int:id>', methods=['GET'])
def get_order_by_id(id):
  order = ''
  try:
    order = Order.query.filter(Order.id == id).one()
  except:
    return f'No order found with the id of {id}', 404

  return { "order": order.to_dict() }

#create new order with products
@order_routes.route('/', methods=['POST'])
def create_order():
  new_order = Order(
    user_id = request.json['user_id'],
    paid = request.json['paid']
  )

  db.session.add(new_order)
  db.session.commit()

  all_order_products = []
  for product in request.json['ordered_products']:
    print('new_product', product)
    ordered_product = OrderProduct(
      order_id = new_order.id,
      product_id = product['product_id'],
      quantity = product['quantity'],
      custom_note = product['custom_note']
    )

    all_order_products.append(ordered_product)

  print(all_order_products)

  db.session.add_all(all_order_products)
  db.session.commit()

  new_complete_order = {
    "order_id": new_order.id,
    "paid": new_order.paid,
    "ordered_products": [product.to_dict() for product in new_order.order_products]
    }

  print(new_complete_order)
  if len(new_complete_order) > 0:
    return jsonify({ "order": new_complete_order })
  else:
    return f'There was no products found to create a new order', 401

#delete order
@order_routes.route('/<int:id>', methods=['DELETE'])
def delete_order(id):
  order = ''
  try:
    order = Order.query.filter(Order.id == id).one()
  except:
    return f'No order found with the id of {id}', 404

  db.session.delete(order)
  db.session.commit()

  return {'response': f'Order number {order.id} was deleted successfully'}
