const express = require('express');
const router = express.Router();

const {
  addPizza,
  getPizzas,
  updatePizza,
  getPizzaById,
  searchPizzas,
  deletePizza,
} = require('../controllers/pizzaController');

router.route('/').get(getPizzas);
router.route('/add-pizza').post(addPizza);
router.route('/:id').put(updatePizza);
router.route('/:id').get(getPizzaById).delete(deletePizza);
router.route('/search/:key').get(searchPizzas);

module.exports = router;
