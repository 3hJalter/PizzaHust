const mongoose = require('mongoose');

// Must Re-write orderController.js.

const orderSchema = new mongoose.Schema({
  comboList: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'combos',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  }],
  pizzaList: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'pizzas',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  }],
  pizzaToppingList: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'pizzaToppings',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  }],
  sideDishList: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'sideDishes',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  }],
  voucher: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'vouchers',
    },
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