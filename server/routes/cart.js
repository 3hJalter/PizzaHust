const express = require('express');
const router = express.Router();

const {
  updateCart,
  userCart,
  addProduct,
} = require('../controllers/CartController');

router.route('/update-Cart').patch(updateCart);
router.route('/user-cart').get(userCart);
router.route('/add-product').patch(addProduct);
module.exports = router;
