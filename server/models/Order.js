const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  comboListId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'combos',
    required: true,
  }],
  pizzaListId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'pizzas',
    required: true,
  }],
  pizzaToppingListId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'pizzaToppings',
    required: true,
  }],
  sideDishListId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'sideDishes',
    required: true,
  }],
  voucherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vouchers',
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