const mongoose = require('mongoose');

const comboSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pizzaListId: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'pizzas',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  }],
  sideDishListId: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'sideDishes',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  }],
  discount: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const Combo = mongoose.model('Combo', comboSchema);

module.exports = Combo;