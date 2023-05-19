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
router.route('/update-side-dish').put(updateSideDish);
router.route('/:id').get(getSideDishById).delete(deleteSideDish);
router.route('/search/:key').get(searchSideDishes);

module.exports = router;
