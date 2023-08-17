const PizzaSize = require('../models/PizzaSize');
const userFromToken = require('../utils/userFromToken');
const Combo = require('../models/Combo');
exports.addPizzaSize = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (userData.role !== 'Admin') {
      return res.status(403).json({
        message: 'You are not authorized to add a pizza size',
      });
    }
    const sizeData = req.body;

    const existingSize = await PizzaSize.findOne({ name: sizeData.name });
    if (existingSize) {
      return res.status(400).json({
        message: 'A size with this name already exists',
      });
    }
    
    const size = await PizzaSize.create({
      name: sizeData.name,
      priceMultiple: sizeData.priceMultiple,
    });
    res.status(200).json({
      size
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

exports.getPizzaSizes = async (req, res) => {
  try {
    const sizes = await PizzaSize.find();
    const formattedSizes = sizes.map(size => ({ ...size._doc, id: size._id }));
    res.setHeader("Access-Control-Expose-Headers", "Content-Range");
    res.setHeader("Content-Range", `courses 0-20/${sizes.length}`);
    res.status(200).json(
      formattedSizes
    );
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

exports.updatePizzaSize = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (userData.role !== 'Admin') {
      return res.status(500).json({
        message: 'Not an admin account',
      });
    }
    const sizeData = req.body;
    const size = await PizzaSize.findById(sizeData.id);
    if (!size) {
      return res.status(400).json({
        message: 'Pizza size not found',
      });
    }
    Object.keys(sizeData).forEach(key => {
      if (sizeData[key] !== undefined) {
        size[key] = sizeData[key];
      }
    });
    await size.save();
    const formattedSize = { ...size._doc, id: size._id };
    res.status(200).json(formattedSize);
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

exports.getPizzaSizeById = async (req, res) => {
  try {
    const { id } = req.params;
    const size = await PizzaSize.findById(id);
    if (!size) {
      return res.status(400).json({
        message: 'Pizza size not found',
      });
    }
    const formattedSize = { ...size._doc, id: size._id };
    res.status(200).json(
      formattedSize
    );
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

exports.deletePizzaSize = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (userData.role !== 'Admin') {
      return res.status(403).json({
        message: 'You are not authorized to delete this pizza size',
      });
    }
    const sizeId = req.params.id;
    const size = await PizzaSize.findById(sizeId);
    if (!size) {
      return res.status(400).json({
        message: 'Pizza size not found',
      });
    }
    await PizzaSize.findByIdAndDelete(sizeId);
    res.status(200).json({
      message: 'Pizza size deleted!',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};
