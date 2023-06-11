const express = require('express');
const router = express.Router();

const {
  addPizzaType,
  getPizzaTypes,
  updatePizzaType,
  getPizzaTypeById,
  deletePizzaType,
} = require('../controllers/pizzaTypeController');

router.route('/').get(getPizzaTypes);
router.route('/add-pizzaType').post(addPizzaType);
router.route('/:id').put(updatePizzaType);
router.route('/:id').get(getPizzaTypeById).delete(deletePizzaType);

module.exports = router;
