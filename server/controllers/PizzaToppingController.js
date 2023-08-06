const PizzaTopping = require('../models/PizzaTopping');
const userFromToken = require('../utils/userFromToken');

exports.addPizzaTopping = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (userData.role !== 'Admin') {
      return res.status(403).json({
        message: 'You are not authorized to add a pizza topping',
      });
    }
    const toppingData = req.body;
    const topping = await PizzaTopping.create({
      name: toppingData.name,
      price: toppingData.price,
      image: toppingData.image,
    });
    res.status(200).json({
      topping
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

exports.getPizzaToppings = async (req, res) => {
  try {
    const toppings = await PizzaTopping.find();
    const formattedToppings = toppings.map(topping => ({ ...topping._doc, id: topping._id }));
    res.setHeader("Access-Control-Expose-Headers", "Content-Range");
    res.setHeader("Content-Range", `courses 0-20/${toppings.length}`);
    res.status(200).json(
      formattedToppings
    );
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

exports.updatePizzaTopping = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (userData.role !== 'Admin') {
      return res.status(500).json({
        message: 'Not an admin account',
      });
    }
    const toppingData = req.body;
    const topping = await PizzaTopping.findById(toppingData.id);
    if (!topping) {
      return res.status(400).json({
        message: 'Pizza topping not found',
      });
    }
    Object.keys(toppingData).forEach(key => {
      if (toppingData[key] !== undefined) {
        topping[key] = toppingData[key];
      }
    });
    await topping.save();
    const formattedTopping = { ...topping._doc, id: topping._id };
    res.status(200).json(formattedTopping);
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

exports.getPizzaToppingById = async (req, res) => {
  try {
    const { id } = req.params;
    const topping = await PizzaTopping.findById(id);
    if (!topping) {
      return res.status(400).json({
        message: 'Pizza topping not found',
      });
    }
    const formattedTopping = { ...topping._doc, id: topping._id };
    res.status(200).json(
      formattedTopping
    );
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

exports.searchPizzaToppings = async (req, res) => {
  try {
    const searchWord = req.params.key;

    if (searchWord === 'undefined') {
      const result = await PizzaTopping.find();
      return res.status(200).json(result);
    }

    const searchMatches = await PizzaTopping.find({
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

exports.deletePizzaTopping = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (userData.role !== 'Admin') {
      return res.status(403).json({
        message: 'You are not authorized to delete this pizza topping',
      });
    }
    const toppingId = req.params.id;
    const topping = await PizzaTopping.findById(toppingId);
    if (!topping) {
      return res.status(400).json({
        message: 'Pizza topping not found',
      });
    }
    await PizzaTopping.findByIdAndDelete(toppingId);
    res.status(200).json({
      message: 'Pizza topping deleted!',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};
