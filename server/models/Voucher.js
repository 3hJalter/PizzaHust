const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  voucherValue: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
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
