const User = require('../models/User');
const bcrypt = require('bcryptjs');
const userFromToken = require('../utils/userFromToken');
const jwt = require('jsonwebtoken');
require('../models/Combo');
require('../models/PizzaTopping');
exports.getUsers = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (userData.role !== 'Customer') {
      const users = await User.find();
      res.status(200).json({
        users,
      });
    }
    else {
      res.status(404).json({
        message: 'Cannot find users because of no confirm role'
      })
    }
  } catch (err) {
    res.status(500).json({
      message: 'Internal server Error',
      error: err,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }
    res.status(200).json({
      user: user,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

exports.register = async (req, res) => {
  try {
    const userData = req.body.userData;
    if (!userData.username || !userData.name || !userData.birth || !userData.email ||
      !userData.address || !userData.phone || !userData.password || !userData.role) {
      return res.status(400).json({
        message: 'username, name, birth, email, address, phone, password, and role are required',
      });
    }
    const username = userData.username;
    // check if user already registered
    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({
        message: 'User already registered',
      });
    }

    user = await User.create({
      username: userData.username,
      name: userData.name,
      birth: userData.birth,
      email: userData.email,
      address: userData.address,
      phone: userData.phone,
      description: userData.description,
      password: await bcrypt.hash(userData.password, 10),
      role: userData.role,
      image: userData.image,
    });

    res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server Error',
      error: err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password, isCustomer } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      const validatedPassword = (password === user.password);
      const checkRole = (user.role === 'Admin' && !isCustomer) || (user.role === 'Customer' && isCustomer);
      if (validatedPassword && checkRole) {
        const token = jwt.sign(
          { username: user.username, id: user._id, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXPIRY,
          },
        );
        user.password = undefined;
        res.status(200).json({
          user,
          token,
        });
      } else {
        res.status(401).json({
          message: 'username or password is incorrect',
        });
      }
    } else {
      res.status(400).json({
        message: 'User not found',
      });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Internal server Error',
      error: err,
    });
  }
};

exports.profile = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (userData) {
      const { username, name, birth, email, address, phone, description, _id, role } = await User.findById(userData.id);
      res.status(200).json({ username, name, birth, email, address, phone, description, _id, role });
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    res.status(500).json({
      message: 'Internal server Error',
      error: err,
    });
  }
};


exports.updateProfile = async (req, res) => {
  try {
    const userData = userFromToken(req);
    const userDataInfo = req.body.user;
    const user = await User.findById(userData.id);
    if (!user) {
      return res.status(400).json({
        message: 'user not found',
      });
    }
    user.name = userDataInfo.name;
    user.birth = userDataInfo.birth;
    user.email = userDataInfo.email;
    user.address = userDataInfo.address;
    user.phone = userDataInfo.phone;
    user.description = userDataInfo.description;
    user.password = userDataInfo.password;
    user.image = userDataInfo.image;
    await user.save();
    res.status(200).json({
      message: 'User updated!',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server Error',
      error: err,
    });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (userData.role !== 'Admin') return res.status(403).json({
      message: 'You are not authorized to delete this combo',
    });
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }
    await User.findByIdAndDelete(userId);
    res.status(200).json({
      message: 'User deleted!',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
}

exports.logout = async (req, res) => {
  res.cookie('token', '').json({
    message: 'logged out successfully!',
  });
};
