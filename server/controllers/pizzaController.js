const Pizza = require('../models/Pizza');
const Combo = require('../models/Combo');
const userFromToken = require('../utils/userFromToken');
const mongoose = require('mongoose');

exports.addPizza = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (userData.role !== 'Admin') {
      return res.status(403).json({
        message: 'You are not authorized to add a pizza',
      });
    }
    const pizzaData = req.body;
    const pizza = await Pizza.create({
      name: pizzaData.name,
      pizzaTypeId: pizzaData.pizzaTypeId,
      price: pizzaData.price,
      description: pizzaData.description,
      image: pizzaData.image,
    });
    res.status(200).json({
      pizza
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

exports.getPizzas = async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    const formattedPizzas = pizzas.map(pizza => ({ ...pizza._doc, id: pizza._id }));
    res.setHeader("Access-Control-Expose-Headers", "Content-Range");
    res.setHeader("Content-Range", `courses 0-20/${pizzas.length}`);
    res.status(200).json(formattedPizzas);
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

exports.updatePizza = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (userData.role !== 'Admin') {
      return res.status(500).json({
        message: 'Not an admin account',
      });
    }
    const pizzaData = req.body;
    const pizza = await Pizza.findById(pizzaData.id);
    if (!pizza) {
      return res.status(400).json({
        message: 'Pizza not found',
      });
    }
    Object.keys(pizzaData).forEach(key => {
      if (pizzaData[key] !== undefined) {
        pizza[key] = pizzaData[key];
      }
    });
    await pizza.save();
    const formattedType = { ...pizza._doc, id: pizza._id };
    res.status(200).json(formattedType);
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

exports.getPizzaById = async (req, res) => {
  try {
    const { id } = req.params;
    const pizza = await Pizza.findById(id);
    if (!pizza) {
      return res.status(400).json({
        message: 'Pizza not found',
      });
    }
    const formattedType = { ...pizza._doc, id: pizza._id };
    res.status(200).json(
      formattedType
    );
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

exports.deletePizza = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (userData.role !== 'Admin') {
      return res.status(403).json({
        message: 'You are not authorized to delete this pizza',
      });
    }
    const pizzaId = req.params.id;
    const pizza = await Pizza.findById(pizzaId);
    if (!pizza) {
      return res.status(400).json({
        message: 'Pizza not found',
      });
    }
    await Pizza.findByIdAndDelete(pizzaId);
    await Combo.deleteMany({ pizzaListId: { $in: [pizzaId] } });
    res.status(200).json({
      message: 'Pizza deleted!',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};
