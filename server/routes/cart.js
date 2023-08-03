const express = require('express');
const router = express.Router();

const {
  userCart,
  addProduct,
  removeProduct,
} = require('../controllers/CartController');

// router.route('/update-Cart').patch(updateCart);
router.route('/user-cart').get(userCart);
router.route('/add-product').patch(addProduct);
router.route('/remove-product').patch(removeProduct);
module.exports = router;
