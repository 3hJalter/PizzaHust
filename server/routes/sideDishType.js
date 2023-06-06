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
router.route('/update-side-dish').put(updateSideDishType);
router.route('/:id').get(getSideDishTypeById).delete(deleteSideDishType);

module.exports = router;
