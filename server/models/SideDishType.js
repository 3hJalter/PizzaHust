const mongoose = require('mongoose');

const sideDishTypeSchema = new mongoose.Schema({
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

const SideDishType = mongoose.model('SideDishType', sideDishTypeSchema);

module.exports = SideDishType;