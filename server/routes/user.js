const express = require('express');
const router = express.Router();

const {
  register,
  login,
  profile,
  updateProfile,
  logout,
} = require('../controllers/userController');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/profile').get(profile);
router.route('/profile:id').put(updateProfile)
router.route('/logout').post(logout);

module.exports = router;
