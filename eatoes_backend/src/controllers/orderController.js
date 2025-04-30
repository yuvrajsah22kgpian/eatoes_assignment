const Order = require('../models/postgresql/Order');
const User = require('../models/postgresql/User');
const Product = require('../models/mongodb/Product')

exports.postOrder = async (req, res) => {
  console.log(req.body);
  const { user_id, order_details } = req.body;
  let total_amount = 0
  for (let idx in order_details) {
    const element = order_details[idx]
    const product = await Product.findById(element.product_id)
    total_amount += product.price * element.quantity
  }
  const user_details = await User.findByPk(user_id);

  const order = await Order.create({
    user_id,
    order_details,
    total_amount,
    user_details
  });

  res.status(201).json(order);
};

exports.getOrder = async (req, res) => {
  const { user_id } = req.params;
  const orders = await Order.findAll({ where: { user_id } });
  res.status(200).json(orders);
};

exports.updateOrder = async (req, res) => {
  const { order_id } = req.params;
  const { status } = req.body;
  const order = await Order.findByPk(order_id);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  order.status = status;
  await order.save();
  res.status(200).json(order);
};

exports.deleteOrder = async (req, res) => {
  const { order_id } = req.params;
  const order = await Order.findByPk(order_id);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  await order.destroy();
  res.status(200).json({ message: 'Order deleted successfully' });
};

