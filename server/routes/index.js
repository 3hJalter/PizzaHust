const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const Pizza = require('../models/Pizza');
const PizzaTopping = require('../models/PizzaTopping');
const SideDish = require('../models/SideDish');
// multer
const upload = multer({ dest: './temp' });

router.get('/', (req, res) => {
  res.status(200).json({
    greeting: 'Hello from Pizza Hust api',
  });
});

router.post('/search', async (req, res) => {
  try {
    const searchWord = req.body.key;
    const type = req.body.type;
    const searchRegex = new RegExp(searchWord, 'i');

    if (searchWord === undefined || searchWord === '') {
      return res.status(200).json([]);
    }

    let searchMatches;
    switch (type) {
      case 'pizza':
        searchMatches = await Pizza.find({
          $or: [
            { name: { $regex: searchRegex } },
          ],
        });
        break;
      case 'sideDish':
        searchMatches = await SideDish.find({
          $or: [
            { name: { $regex: searchRegex } },
          ],
        });
        break;
      case 'pizzaTopping':
        searchMatches = await PizzaTopping.find({
          $or: [
            { name: { $regex: searchRegex } },
          ],
        });
        break;
    }
    res.status(200).json(searchMatches);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal server error',
      error: err.toString()
    });
  }
});

// upload photo using image url
router.post('/upload-by-link', async (req, res) => {
  try {
    const { link } = req.body;
    let result = await cloudinary.uploader.upload(link, {
      folder: 'PizzaHust',
    });
    res.json(result.secure_url);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
});

// upload images from local device
router.post('/upload', upload.array('photos', 100), async (req, res) => {
  try {
    let imageArray = [];

    for (let index = 0; index < req.files.length; index++) {
      let { path } = req.files[index];
      let result = await cloudinary.uploader.upload(path, {
        folder: 'PizzaHust',
      });
      imageArray.push(result.secure_url);
    }

    res.status(200).json(imageArray);
  } catch (error) {
    console.log('Error: ', error);
    res.status(500).json({
      error,
      message: 'Internal server error',
    });
  }
});

router.use('/cart', require('./cart'));
router.use('/user', require('./user'));
router.use('/combo', require('./combo'));
router.use('/order', require('./order'));
router.use('/pizza', require('./pizza'));
router.use('/pizzaType', require('./pizzaType'))
router.use('/pizzaTopping', require('./pizzaTopping'));
router.use('/sideDish', require('./sideDish'));
router.use('/sideDishType', require('./sideDishType'));
router.use('/voucher', require('./voucher'));


module.exports = router;
