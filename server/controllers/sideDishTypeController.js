const SideDishType = require('../models/SideDishType');
const userFromToken = require('../utils/userFromToken');

exports.addSideDishType = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (userData.role !== 'Admin') {
      return res.status(403).json({
        message: 'You are not authorized to add a side dish type',
      });
    }
    const typeData = req.body.sideDishType;
    const sideDishType = await SideDishType.create({
      name: typeData.name,
      description: typeData.description,
      image: typeData.image,
    });
    res.status(200).json({
      sideDishType,
      message: 'Side dish type added successfully',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

exports.getSideDishTypes = async (req, res) => {
  try {
    const types = await SideDishType.find();
    res.status(200).json({
      types,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

exports.updateSideDishType = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (userData.role !== 'Admin') {
      return res.status(500).json({
        message: 'Not an admin account',
      });
    }
    const typeData = req.body.sideDishType;
    const sideDishType = await SideDishType.findById(typeData.id);
    if (!sideDishType) {
      return res.status(400).json({
        message: 'Side dish type not found',
      });
    }
    sideDishType.name = typeData.name;
    sideDishType.description = typeData.description;
    sideDishType.image = typeData.image;
    await sideDishType.save();
    res.status(200).json({
      message: 'Side dish type updated!',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

exports.getSideDishTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const sideDishType = await SideDishType.findById(id);
    if (!sideDishType) {
      return res.status(400).json({
        message: 'Side dish type not found',
      });
    }
    res.status(200).json({
      sideDishType,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

exports.deleteSideDishType = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (userData.role !== 'Admin') {
      return res.status(403).json({
        message: 'You are not authorized to delete this side dish type',
      });
    }
    const typeId = req.params.id;
    const sideDishType = await SideDishType.findById(typeId);
    if (!sideDishType) {
      return res.status(400).json({
        message: 'Side dish type not found',
      });
    }
    await SideDishType.findByIdAndDelete(typeId);
    res.status(200).json({
      message: 'Side dish type deleted!',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};
