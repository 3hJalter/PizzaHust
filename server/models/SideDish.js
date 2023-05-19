const mongoose = require('mongoose');

const sideDishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sideDishTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'sideDishTypes',
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

const SideDish = mongoose.model('SideDish', sideDishSchema);

module.exports = SideDish;
