const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
  priceRequired: {
    type: Number,
    required: true,
  },
  discount: {
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

const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;
