const express = require('express');
const router = express.Router();

const {
  addSideDishType,
  getSideDishTypes,
  updateSideDishType,
  getSideDishTypeById,
  deleteSideDishType,
} = require('../controllers/sideDishTypeController');

router.route('/').get(getSideDishTypes);
router.route('/add-side-dish').post(addSideDishType);
router.route('/:id').put(updateSideDishType);
router.route('/:id').get(getSideDishTypeById)
router.route('/:id').delete(deleteSideDishType);

module.exports = router;
