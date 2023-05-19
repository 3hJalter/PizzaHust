const mongoose = require('mongoose');

const pizzaTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  }
});

const PizzaType = mongoose.model('PizzaType', pizzaTypeSchema);

module.exports = PizzaType;