const Combo = require('../models/Combo');
const userFromToken = require('../utils/userFromToken');

exports.addCombo = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (userData.role !== 'Admin') return res.status(403).json({
      message: 'You are not authorized to create this combo',
    });
    const comboData = req.body;
    // Check if a combo with the same name already exists
    const existingCombo = await Combo.findOne({ name: comboData.name });
    if (existingCombo) {
      return res.status(400).json({
        message: 'A combo with this name already exists',
      });
    }
    const combo = await Combo.create({
      name: comboData.name,
      pizzaListId: comboData.pizzaListId,
      sideDishListId: comboData.sideDishListId,
      price: comboData.price,
      description: comboData.description,
      image: comboData.image,
    });
    res.status(200).json({
      combo,
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
    const formattedCombos = combos.map(combo => ({ ...combo._doc, id: combo._id }));
    res.setHeader("Access-Control-Expose-Headers", "Content-Range");
    res.setHeader("Content-Range", `courses 0-20/${combos.length}`);
    res.status(200).json(formattedCombos);
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
    const comboData = req.body;
    const combo = await Combo.findById(comboData.id);
    if (!combo) {
      return res.status(400).json({
        message: 'Combo not found',
      });
    }
    Object.keys(comboData).forEach(key => {
      if (comboData[key] !== undefined) {
        combo[key] = comboData[key];
      }
    });
    await combo.save();
    const formattedType = { ...combo._doc, id: combo._id };
    res.status(200).json(formattedType);
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
    const formattedType = { ...combo._doc, id: combo._id };
    res.status(200).json(
      formattedType
    );
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
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

