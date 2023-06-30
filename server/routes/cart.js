const express = require('express');
const router = express.Router();

const {
  updateCart,
  userCart,
} = require('../controllers/CartController');

router.route('/update-Cart').patch(updateCart);
router.route('/user-cart').get(userCart);

module.exports = router;
