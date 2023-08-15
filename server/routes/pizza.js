const express = require('express');
const router = express.Router();

const {
  addPizza,
  getPizzas,
  updatePizza,
  getPizzaById,
  getPizzaByTypeAndSize,
  searchPizzas,
  deletePizza,
} = require('../controllers/pizzaController');

router.route('/').get(getPizzas);
router.route('/add-pizza').post(addPizza);
router.route('/:id').put(updatePizza);
router.route('/:id').get(getPizzaById)
router.route('/:id').delete(deletePizza);
router.route('/search/:key').get(searchPizzas);
router.route('/search').post(getPizzaByTypeAndSize);

module.exports = router;
