const PizzaType = require('../models/PizzaType');
const userFromToken = require('../utils/userFromToken');

exports.addPizzaType = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (userData.role !== 'Admin') {
      return res.status(403).json({
        message: 'You are not authorized to add a pizza type',
      });
    }
    const typeData = req.body.typeData;
    const pizzaType = await PizzaType.create({
      name: typeData.name,
      description: typeData.description,
      image: typeData.image,
    });
    res.status(200).json({
      pizzaType,
      message: 'Pizza type added successfully',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

exports.getPizzaTypes = async (req, res) => {
  try {
    const types = await PizzaType.find();
    res.status(200).json({
      types,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

exports.updatePizzaType = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (userData.role !== 'Admin') {
      return res.status(500).json({
        message: 'Not an admin account',
      });
    }
    const typeData = req.body.typeData;
    const pizzaType = await PizzaType.findById(typeData.id);
    if (!pizzaType) {
      return res.status(400).json({
        message: 'Pizza type not found',
      });
    }
    pizzaType.name = typeData.name;
    pizzaType.description = typeData.description;
    pizzaType.image = typeData.image;
    await pizzaType.save();
    res.status(200).json({
      message: 'Pizza type updated!',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

exports.getPizzaTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const pizzaType = await PizzaType.findById(id);
    if (!pizzaType) {
      return res.status(400).json({
        message: 'Pizza type not found',
      });
    }
    res.status(200).json({
      pizzaType,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};



exports.deletePizzaType = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (userData.role !== 'Admin') {
      return res.status(403).json({
        message: 'You are not authorized to delete this pizza type',
      });
    }
    const typeId = req.params.id;
    const pizzaType = await PizzaType.findById(typeId);
    if (!pizzaType) {
      return res.status(400).json({
        message: 'Pizza type not found',
      });
    }
    await PizzaType.findByIdAndDelete(typeId);
    res.status(200).json({
      message: 'Pizza type deleted!',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};
