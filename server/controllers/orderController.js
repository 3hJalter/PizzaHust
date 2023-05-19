const Order = require('../models/Order');
const userFromToken = require('../utils/userFromToken');

exports.addOrder = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (userData.role !== 'Customer') return res.status(403).json({
      message: 'You are not authorized to create this order',
    });
    const orderData = req.body.orderData;
    const order = await Order.create({
      comboListId: orderData.comboListId,
      pizzaListId: orderData.pizzaListId,
      pizzaToppingListId: orderData.pizzaToppingListId,
      sideDishListId: orderData.sideDishListId,
      voucherId: orderData.voucherId,
      price: orderData.price,
      orderStatus: orderData.orderStatus,
      description: orderData.description,
      userId: userData.id,
    });

    res.status(200).json({
      order,
      message: 'Order added successfully',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const userData = userFromToken(req);
    const orders = userData.role !== 'Customer' ?
      await Order.find() :
      await Order.find({ user: userData.id })
        .populate(['comboListId', 'pizzaListId', 'pizzaToppingListId', 'sideDishListId', 'voucherId']);
    res.status(200).json({
      orders,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (userData.role !== 'Admin') return res.status(403).json({
      message: 'You are not authorized to update this order',
    });
    const { id } = req.params;
    const orderData = req.body.orderData;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(400).json({
        message: 'Order not found',
      });
    }
    order.orderStatus = orderData.orderStatus;
    await order.save();
    res.status(200).json({
      message: 'Order updated!',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(400).json({
        message: 'Order not found',
      });
    }
    res.status(200).json({
      order,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

exports.userOrders = async (req, res) => {
  try {
    const userData = userFromToken(req);
    const id = userData.id;
    res.status(200).json(await Order.find({ userId: id }));
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(400).json({
        message: 'Order not found',
      });
    }

    const userData = userFromToken(req);
    if (userData.role === 'Customer' && order.orderStatus !== 'Pending') {
      return res.status(403).json({
        message: 'You can not cancel this order after pending. ' +
          'If you have special reason, please contact the restaurant directly',
      });
    }

    await Order.findByIdAndDelete(id);
    res.status(200).json({
      message: 'Order deleted!',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};
