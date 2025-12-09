import Order from "../models/order.js"
import Product from "../models/product.js"

const addOrder = async (req, res) => {
  const {
    orderItems,
    shippingCharge,
    shippingAddress,
  } = req.body;

  const orderItemsFromDb = await Product.find({
    _id: { $in: orderItems.map(item => item.productId) }
  });

  const newOrderItems = orderItems.map(item => {
    const actualItem = orderItemsFromDb.find(i => i._id == item.productId)
    return {
      ...item,
      price: actualItem.price
    }
  })

  const itemPrice = newOrderItems.reduce(
    (total, item) => total + Number(item.qty) * Number(item.price), 0)
    .toFixed(2)
  const totalPrice = (Number(itemPrice) + Number(shippingCharge)).toFixed(2);

  const order = await Order.create({
    orderItems: newOrderItems,
    shippingAddress,
    shippingCharge,
    itemPrice,
    totalPrice,
    user: req.user._id,
  })
  res.send({ message: "Order placed successfully", orderId: order._id })
}

const getOrders = async (req, res) => {
  const orders = await Order.find();
  res.send(orders);
}

const getMyOrders = async (req, res) => {
  const myOrders = await Order.find({ user: req.user._id })
  res.send(myOrders);
}

const getOrderById = async (req, res) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId);
  res.send(order);
}

const payOrder = async (req, res) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId);
  if (!order) return res.status(404).send({ error: "Order not found" });
  order.isPaid = true
  order.paidAt = Date.now()
  order.paymentMethod = req.body.paymentMethod;
  await order.save();

  //await Order.findByIdandUpdate(id, {isPaid: Date.now()}, {paymentMethod: req.body.paymentMethod})

  res.send({ message: "Order paid successfully!" })
}

const deliverOrder = async (req, res) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId);
  if (!order) return res.status(404).send({ error: "Order not found" });
  if (order.isPaid) {
    order.isDelivered = true
    order.deliveredAt = Date.now()
    await order.save();
    res.send({ message: "Order delivered!!" })
  } else {
    res.status(400).send({ error: "Order not payed yet!!" })
  }
}
export { addOrder, getOrders, getMyOrders, getOrderById, payOrder, deliverOrder };