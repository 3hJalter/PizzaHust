const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  comboList: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'pizzas',
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
  }],
  pizzaList: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'pizzas',
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
  }],
  pizzaToppingList: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'pizzas',
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
  }],
  sideDishList: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'pizzas',
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
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;