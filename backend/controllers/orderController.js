import Order from "../models/order.js";
import Product from "../models/product.js";

const addOrder = async (req, res) => {
  const { orderItems, shippingAddress, shippingCharge, paymentMethod } = req.body;
  const orderItemsFromDb = await Product.find({
    _id: { $in: orderItems.map((item) => item._id) },
  });

  const newOrderItems = orderItems.map((item) => {
    const actualItem = orderItemsFromDb.find((i) => i._id == item._id);
    return {
      ...item,
      price: actualItem.price,
      _id: null,
      productId: actualItem._id,
    };
  });

  const itemPrice = newOrderItems
    .reduce((total, item) => total + Number(item.qty) * Number(item.price), 0)
    .toFixed(2);

  const totalPrice = (Number(itemPrice) + Number(shippingCharge)).toFixed(2);
 const order = await Order.create({
  orderItems: newOrderItems,
  shippingAddress,
  shippingCharge,
  itemPrice,
  totalPrice,
  paymentMethod,
  user: req.user._id,
});
  res.send({ message: "Order placed successfully", orderId: order._id });
};

const getOrders = async (req, res) => {
  const orders = await Order.find();
  res.send(orders);
};

const getMyOrders = async (req, res) => {
  console.log(req.user._id);
  const myOrders = await Order.find({ user: req.user._id });
  res.send(myOrders);
};

const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "fullname email"
  );
  res.send(order);
};

const payOrder = async (req, res) => {
  const id = req.params.id;
  const order = await Order.findById(id);
  if (!order) return res.status(404).send({ error: "Order not found" });
  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentMethod = req.body.paymentMethod;
  await order.save();
  // await Order.findByIdAndUpdate(id, {isPaid: true, paidAt= Date.now(), paymentMethod: order.paymentMethod})
  res.send({ message: "Order paid successfully!!!" });
};

const deliverOrder = async (req, res) => {
  const id = req.params.id;
  const order = await Order.findById(id);
  if (!order) return res.status.send({ error: "Order not found!!!" });
  if (order.isPaid) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    await order.save();
    res.send({ message: "Order delviered!!!" });
  } else {
    res.status(400).send({ error: "Order not paid yet!" });
  }
};

export {
  addOrder,
  getOrders,
  getMyOrders,
  getOrderById,
  payOrder,
  deliverOrder,
};
