const SideDish = require('../models/SideDish');
const userFromToken = require('../utils/userFromToken');
const Combo = require('../models/Combo');

exports.addSideDish = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (userData.role !== 'Admin') {
      return res.status(403).json({
        message: 'You are not authorized to add a side dish',
      });
    }
    const sideDishData = req.body;

    const existingSideDish = await SideDish.findOne({ name: sideDishData.name });
    if (existingSideDish) {
      return res.status(400).json({
        message: 'A sideDish with this name already exists',
      });
    }
    
    const sideDish = await SideDish.create({
      name: sideDishData.name,
      sideDishTypeId: sideDishData.sideDishTypeId,
      price: sideDishData.price,
      description: sideDishData.description,
      image: sideDishData.image,
    });
    res.status(200).json({
      sideDish,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

exports.getSideDishes = async (req, res) => {
  try {
    const sideDishes = await SideDish.find();
    const formattedSideDishes = sideDishes.map(sideDish => ({ ...sideDish._doc, id: sideDish._id }));
    res.setHeader("Access-Control-Expose-Headers", "Content-Range");
    res.setHeader("Content-Range", `courses 0-20/${sideDishes.length}`);
    res.status(200).json(formattedSideDishes);
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

exports.updateSideDish = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (userData.role !== 'Admin') {
      return res.status(500).json({
        message: 'Not an admin account',
      });
    }
    const sideDishData = req.body;
    const sideDish = await SideDish.findById(sideDishData.id);
    if (!sideDish) {
      return res.status(400).json({
        message: 'Side dish not found',
      });
    }
    Object.keys(sideDishData).forEach(key => {
      if (sideDishData[key] !== undefined) {
        sideDish[key] = sideDishData[key];
      }
    });
    await sideDish.save();
    const formattedType = { ...sideDish._doc, id: sideDish._id };
    res.status(200).json(formattedType);
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

exports.getSideDishById = async (req, res) => {
  try {
    const { id } = req.params;
    const sideDish = await SideDish.findById(id);
    if (!sideDish) {
      return res.status(400).json({
        message: 'Side dish not found',
      });
    }
    const formattedType = { ...sideDish._doc, id: sideDish._id };
    res.status(200).json(
      formattedType
    );
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

exports.searchSideDishes = async (req, res) => {
  try {
    const searchWord = req.params.key;

    if (searchWord === 'undefined') {
      const result = await SideDish.find();
      return res.status(200).json(result);
    }

    const searchMatches = await SideDish.find({
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

exports.deleteSideDish = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (userData.role !== 'Admin') {
      return res.status(403).json({
        message: 'You are not authorized to delete this side dish',
      });
    }
    const sideDishId = req.params.id;
    const sideDish = await SideDish.findById(sideDishId);
    if (!sideDish) {
      return res.status(400).json({
        message: 'Side dish not found',
      });
    }
    await SideDish.findByIdAndDelete(sideDishId);
    await Combo.deleteMany({ sideDishListId: { $in: [sideDishId] } });
    res.status(200).json({
      message: 'Side dish deleted!',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};
