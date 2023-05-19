const Combo = require('../models/Combo');
const userFromToken = require('../utils/userFromToken');

exports.addCombo = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (userData.role !== 'Admin') return res.status(403).json({
      message: 'You are not authorized to create this combo',
    });
    const comboData = req.body.comboData;
    const combo = await Combo.create({
      name: comboData.name,
      pizzaListId: comboData.pizzaListId,
      sideDishListId: comboData.sideDishListId,
      discount: comboData.discount,
      price: comboData.price,
      description: comboData.description,
      image: comboData.image,
    });
    res.status(200).json({
      combo,
      message: 'Combo added successfully',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

exports.getCombos = async (req, res) => {
  try {
    const combos = await Combo.find();
    res.status(200).json({
      combos,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

exports.updateCombo = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (userData.role !== 'Admin') return res.status(500).json({
      message: 'Not Admin account',
    });
    const comboData = req.body.comboData;
    const combo = await Combo.findById(comboData.id);
    if (!combo) {
      return res.status(400).json({
        message: 'Combo not found',
      });
    }
    combo.name = comboData.name;
    combo.pizzaListId = comboData.pizzaListId;
    combo.sideDishListId = comboData.sideDishListId;
    combo.discount = comboData.discount;
    combo.price = comboData.price;
    combo.description = comboData.description;
    combo.image = comboData.image;
    await combo.save();
    res.status(200).json({
      message: 'Combo updated!',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

exports.getComboById = async (req, res) => {
  try {
    const { id } = req.params;
    const combo = await Combo.findById(id);
    if (!combo) {
      return res.status(400).json({
        message: 'Combo not found',
      });
    }
    res.status(200).json({
      combo,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

exports.searchCombos = async (req, res) => {
  try {
    const searchWord = req.params.key;

    if (searchWord === 'undefined') {
      const result = await Combo.find();
      return res.status(200).json(result);
    }

    const searchMatches = await Combo.find({
      address: { $regex: searchWord, $options: 'i' },
    });

    res.status(200).json(searchMatches);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal server error 1',
    });
  }
};

exports.deleteCombo = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (userData.role !== 'Admin') return res.status(403).json({
      message: 'You are not authorized to delete this combo',
    });
    const comboId = req.params.id;
    const combo = await Combo.findById(comboId);
    if (!combo) {
      return res.status(400).json({
        message: 'Combo not found',
      });
    }
    await Combo.findByIdAndDelete(comboId);
    res.status(200).json({
      message: 'Combo deleted!',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

