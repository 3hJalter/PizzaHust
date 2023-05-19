const express = require('express');
const router = express.Router();

const {
  addCombo,
  getCombos,
  updateCombo,
  getComboById,
  searchCombos,
  deleteCombo,
} = require('../controllers/comboController');

router.route('/').get(getCombos);
router.route('/add-combo').post(addCombo);
router.route('/update-combo').put(updateCombo);
router.route('/:id').get(getComboById).delete(deleteCombo);
router.route('/search/:key').get(searchCombos);

module.exports = router;
