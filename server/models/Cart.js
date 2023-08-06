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
  totalPrice: {
    type: Number,
  },
  finalPrice: {
    type: Number,
  },
});

CartSchema.index({ userId: 1 }, { unique: 1 });

// Calculate total price automatically after save
CartSchema.pre("save", function (next) {
  this.totalPrice = this.productList.reduce(
    (total, item) =>
      total + (item.price)*(item.quantity),
      0
  );
  next();
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;