const express = require('express');
const router = express.Router();

const {
  addSideDish,
  getSideDishes,
  updateSideDish,
  getSideDishById,
  searchSideDishes,
  deleteSideDish,
} = require('../controllers/sideDishController');

router.route('/').get(getSideDishes);
router.route('/add-side-dish').post(addSideDish);
router.route('/:id').put(updateSideDish);
router.route('/:id').get(getSideDishById).delete(deleteSideDish);

module.exports = router;
