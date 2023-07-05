const mongoose = require('mongoose');

// Must Re-write orderController.js.

const orderSchema = new mongoose.Schema({
  productList: [{
    _id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    type: {
      type: String,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    size: {
      type: String,
    },
    toppingList: [{
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pizzaToppings',
      },
      name: {
        type: String,
      },
      price: {
        type: Number,
      }
    }]
  }],
  voucher: {
    name: {
      type: String,
    },
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  orderStatus: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;