const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pizzaTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'pizzaTypes',
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
  }
});

const Pizza = mongoose.model('Pizza', pizzaSchema);

module.exports = Pizza;
