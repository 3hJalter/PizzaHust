const mongoose = require('mongoose');

const pizzaToppingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  }
});

const PizzaTopping = mongoose.model('PizzaTopping', pizzaToppingSchema);

module.exports = PizzaTopping;