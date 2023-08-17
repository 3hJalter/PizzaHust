const SideDishType = require('../models/SideDishType');
const SideDish = require('../models/SideDish');
const userFromToken = require('../utils/userFromToken');
const Combo = require('../models/Combo');

exports.addSideDishType = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (userData.role !== 'Admin') {
      return res.status(403).json({
        message: 'You are not authorized to add a side dish type',
      });
    }
    const typeData = req.body;

    const existingSideDishType = await SideDishType.findOne({ name: sideDishTypeData.name });
    if (existingSideDishType) {
      return res.status(400).json({
        message: 'A sideDishType with this name already exists',
      });
    }
    
    const sideDishType = await SideDishType.create({
      name: typeData.name,
      description: typeData.description,
      image: typeData.image,
    });
    res.status(200).json({
      sideDishType,
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
    const formattedType = types.map(type => ({ ...type._doc, id: type._id }));
    res.setHeader("Access-Control-Expose-Headers", "Content-Range");
    res.setHeader("Content-Range", `courses 0-20/${types.length}`);
    res.status(200).json(formattedType);
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
    const typeData = req.body;
    const sideDishType = await SideDishType.findById(typeData.id);
    if (!sideDishType) {
      return res.status(400).json({
        message: 'Side dish type not found',
      });
    }
    Object.keys(typeData).forEach(key => {
      if (typeData[key] !== undefined) {
        sideDishType[key] = typeData[key];
      }
    });
    await sideDishType.save();
    const formattedType = { ...sideDishType._doc, id: sideDishType._id };
    res.status(200).json(formattedType);
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
    const formattedType = { ...sideDishType._doc, id: sideDishType._id };
    res.status(200).json(
      formattedType
    );
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

    await SideDish.deleteMany({sideDishTypeId: typeId}); // remove
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};
