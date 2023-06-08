const express = require('express');
const router = express.Router();

const {
  addVoucher,
  getVouchers,
  updateVoucher,
  getVoucherById,
  searchVouchers,
  deleteVoucher,
} = require('../controllers/voucherController');

router.route('/').get(getVouchers);
router.route('/add-voucher').post(addVoucher);
router.route('/:id').put(updateVoucher);
router.route('/:id').get(getVoucherById).delete(deleteVoucher);
router.route('/search/:key').get(searchVouchers);

module.exports = router;
