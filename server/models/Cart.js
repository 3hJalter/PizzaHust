const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
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
  }]
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;