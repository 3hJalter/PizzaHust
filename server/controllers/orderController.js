const Order = require('../models/Order');
const Cart = require('../models/Cart');
const userFromToken = require('../utils/userFromToken');
const Voucher = require('../models/Voucher');

exports.addOrder = async (req, res) => {
  try {
    const userData = userFromToken(req);
    // const id = userData.id;
    // const id = '64670433aac03b50b8029d73';
    // if (userData.role !== 'Customer') return res.status(403).json({
    //   message: 'You are not authorized to create this order',
    // });
    const cart = await Cart.findOne({ userId: userData.id });
    let tPrice = cart.totalPrice

    const orderData = req.body;

    const voucher = await Voucher.findById(orderData.voucherId);

    if (orderData.voucherId) {
      // Check orderData.voucherId exist

      // If no voucher found
      if (!voucher)
          return {
              message: "No voucher code found!",
          };


      // Check min price required
      if (cart.totalPrice > voucher.priceRequired) {
          // Check price unit
          if (voucher.type === "percent") {
              // Check value to reduce amount
              const reducedAmount =
                  (cart.totalPrice * voucher.discount) / 100;

              if (reducedAmount > cart.totalPrice) {
                  tPrice -= cart.totalPrice;
              } else {
                  tPrice -= reducedAmount;
              }
          } else {
              tPrice -= voucher.discount;
          }
      }
      // discount.available -= 1;
      // await voucher.save();
  }

    let fPrice = tPrice + orderData.shippingFee;

    const order = await Order.create({
      productList: cart.productList,
      orderPrice: orderData.orderPrice,
      voucher: voucher.description,
      totalPrice: tPrice,
      shippingFee: orderData.shippingFee,
      finalPrice: fPrice,
      address: orderData.address,
      orderStatus: "Pending",
      userId: userData.id,
      phone: orderData.phone,
    });

    cart.productList = [];
    cart.totalPrice = 0;
    await cart.save();

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
    // const id = '64670433aac03b50b8029d73';
    // const role = 'Customer'
    // const orders = role !== 'Customer' ?
    //   await Order.find() :
    //   await Order.find({ userId: id })
    let orders;
    orders = userData.role !== 'Customer' ?
      await Order.find() :
      await Order.find({ user: userData.id })

    const formattedOrders = orders.map(order => ({ ...order._doc, id: order._id }));
    res.setHeader("Access-Control-Expose-Headers", "Content-Range");
    res.setHeader("Content-Range", `courses 0-20/${orders.length}`);
    res.status(200).json(formattedOrders);
  } catch (err) {
    res.status(500).json({
        message: `Internal server error: ${err}`,
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
    const orderData = req.body;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(400).json({
        message: 'Order not found',
      });
    }
    order.orderStatus = orderData.orderStatus;
    await order.save();
    const formattedOrder = { ...order._doc, id: order._id };
    res.status(200).json(formattedOrder);
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
    const formattedOrder = { ...order._doc, id: order._id };
    res.status(200).json(formattedOrder);
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
    const orders = await Order.find({ userId: id })
    res.status(200).json({orders});
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
