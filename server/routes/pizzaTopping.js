const express = require('express');
const router = express.Router();

const {
  addPizzaTopping,
  getPizzaToppings,
  updatePizzaTopping,
  getPizzaToppingById,
  searchPizzaToppings,
  deletePizzaTopping,
} = require('../controllers/pizzaToppingController');

router.route('/').get(getPizzaToppings);
router.route('/add-pizza-topping').post(addPizzaTopping);
router.route('/:id').put(updatePizzaTopping);
router.route('/:id').get(getPizzaToppingById).delete(deletePizzaTopping);
router.route('/search/:key').get(searchPizzaToppings);

module.exports = router;
