const Voucher = require('../models/Voucher');
const userFromToken = require('../utils/userFromToken');

exports.addVoucher = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (userData.role !== 'Admin') {
      return res.status(403).json({
        message: 'You are not authorized to add a voucher',
      });
    }
    const voucherData = req.body.voucherData;
    const voucher = await Voucher.create({
      priceRequired: voucherData.priceRequired,
      discount: voucherData.discount,
      description: voucherData.description,
      image: voucherData.image,
    });
    res.status(200).json({
      voucher,
      message: 'Voucher added successfully',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

exports.getVouchers = async (req, res) => {
  try {
    const vouchers = await Voucher.find();
    res.status(200).json({
      vouchers,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

exports.updateVoucher = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (userData.role !== 'Admin') {
      return res.status(500).json({
        message: 'Not an admin account',
      });
    }
    const voucherData = req.body.voucherData;
    const voucher = await Voucher.findById(voucherData.id);
    if (!voucher) {
      return res.status(400).json({
        message: 'Voucher not found',
      });
    }
    voucher.priceRequired = voucherData.priceRequired;
    voucher.discount = voucherData.discount;
    voucher.description = voucherData.description;
    voucher.image = voucherData.image;
    await voucher.save();
    res.status(200).json({
      message: 'Voucher updated!',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

exports.getVoucherById = async (req, res) => {
  try {
    const { id } = req.params;
    const voucher = await Voucher.findById(id);
    if (!voucher) {
      return res.status(400).json({
        message: 'Voucher not found',
      });
    }
    res.status(200).json({
      voucher,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

exports.searchVouchers = async (req, res) => {
  try {
    const searchWord = req.params.key;

    if (searchWord === 'undefined') {
      const result = await Voucher.find();
      return res.status(200).json(result);
    }

    const searchMatches = await Voucher.find({
      address: { $regex: searchWord, $options: 'i' },
    });

    res.status(200).json(searchMatches);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal server error 1',
    });
  }
};

exports.deleteVoucher = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (userData.role !== 'Admin') {
      return res.status(403).json({
        message: 'You are not authorized to delete this voucher',
      });
    }
    const voucherId = req.params.id;
    const voucher = await Voucher.findById(voucherId);
    if (!voucher) {
      return res.status(400).json({
        message: 'Voucher not found',
      });
    }
    await Voucher.findByIdAndDelete(voucherId);
    res.status(200).json({
      message: 'Voucher deleted!',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};
