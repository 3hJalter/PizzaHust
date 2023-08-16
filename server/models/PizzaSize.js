const mongoose = require('mongoose');

const pizzaSizeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  priceMultiple: {
    type: Number,
    required: true,
  },
});

const PizzaSize = mongoose.model('PizzaSize', pizzaSizeSchema);

module.exports = PizzaSize;