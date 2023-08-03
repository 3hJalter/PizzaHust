const express = require('express');
const router = express.Router();

const {
  addOrder,
  getOrders,
  updateOrder,
  getOrderById,
  userOrders,
  deleteOrder,
} = require('../controllers/orderController');

router.route('/').get(getOrders);
router.route('/add-order').post(addOrder);
router.route('/update-order').put(updateOrder);
router.route('/user-orders').get(userOrders);
router.route('/:id').get(getOrderById);
// router.route('/:id').get(getOrderById).delete(deleteOrder);

module.exports = router;
