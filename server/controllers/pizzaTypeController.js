const PizzaType = require('../models/PizzaType');
const userFromToken = require('../utils/userFromToken');
const Pizza = require('../models/Pizza');
const Combo = require('../models/Combo');

exports.addPizzaType = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (userData.role !== 'Admin') {
      return res.status(403).json({
        message: 'You are not authorized to add a pizza type',
      });
    }
    const typeData = req.body;

    const existingType = await PizzaType.findOne({ name: typeData.name });
    if (existingType) {
      return res.status(400).json({
        message: 'A type with this name already exists',
      });
    }
    
    const pizzaType = await PizzaType.create({
      name: typeData.name,
      description: typeData.description,
      image: typeData.image,
    });
    res.status(200).json({
      pizzaType,
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

exports.updatePizzaType = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (userData.role !== 'Admin') {
      return res.status(500).json({
        message: 'Not an admin account',
      });
    }
    const typeData = req.body;
    const pizzaType = await PizzaType.findById(typeData.id);
    if (!pizzaType) {
      return res.status(400).json({
        message: 'Pizza type not found',
      });
    }
    Object.keys(typeData).forEach(key => {
      if (typeData[key] !== undefined) {
        pizzaType[key] = typeData[key];
      }
    });
    await pizzaType.save();
    const formattedType = { ...pizzaType._doc, id: pizzaType._id };
    res.status(200).json(formattedType);
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
    const formattedType = { ...pizzaType._doc, id: pizzaType._id };
    res.status(200).json(
      formattedType
    );
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

    await Pizza.deleteMany({ pizzaTypeId: typeId });

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
