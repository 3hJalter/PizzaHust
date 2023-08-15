const express = require('express');
const router = express.Router();

const {
  addPizzaSize,
  getPizzaSizes,
  updatePizzaSize,
  getPizzaSizeById,
  deletePizzaSize,
} = require('../controllers/pizzaSizeController');

router.route('/').get(getPizzaSizes);
router.route('/add-pizza-size').post(addPizzaSize);
router.route('/:id').put(updatePizzaSize);
router.route('/:id').get(getPizzaSizeById).delete(deletePizzaSize);

module.exports = router;
