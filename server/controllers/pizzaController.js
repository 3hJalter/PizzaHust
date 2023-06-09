const Pizza = require('../models/Pizza');
const Combo = require('../models/Combo');
const userFromToken = require('../utils/userFromToken');

exports.addPizza = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (userData.role !== 'Admin') {
      return res.status(403).json({
        message: 'You are not authorized to add a pizza',
      });
    }
    const pizzaData = req.body.pizzaData;
    const pizza = await Pizza.create({
      name: pizzaData.name,
      pizzaSize: pizzaData.pizzaSize,
      pizzaTypeId: pizzaData.pizzaTypeId,
      price: pizzaData.price,
      description: pizzaData.description,
      image: pizzaData.image,
    });
    res.status(200).json({
      pizza,
      message: 'Pizza added successfully',
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
    res.status(200).json({
      pizzas,
    });
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
    const pizzaData = req.body.pizzaData;
    const pizza = await Pizza.findById(pizzaData.id);
    if (!pizza) {
      return res.status(400).json({
        message: 'Pizza not found',
      });
    }
    pizza.name = pizzaData.name;
    pizza.pizzaSize = pizzaData.pizzaSize;
    pizza.pizzaTypeId = pizzaData.pizzaTypeId;
    pizza.price = pizzaData.price;
    pizza.description = pizzaData.description;
    pizza.image = pizzaData.image;
    await pizza.save();
    res.status(200).json({
      message: 'Pizza updated!',
    });
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
    res.status(200).json({
      pizza,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

exports.searchPizzas = async (req, res) => {
  try {
    const searchWord = req.params.key;

    if (searchWord === 'undefined') {
      const result = await Pizza.find();
      return res.status(200).json(result);
    }

    const searchMatches = await Pizza.find({
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
