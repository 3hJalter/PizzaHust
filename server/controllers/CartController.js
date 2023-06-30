const Cart = require('../models/Cart');
const userFromToken = require('../utils/userFromToken');

exports.updateCart = async (req, res) => {
  try {
    // const userData = userFromToken(req);
    // const id = userData.id;
    // Remove below code when testing done
    const id = '64670433aac03b50b8029d73';
    const cart = await Cart.findOne({ userId: id });
    if (!cart) {
      return res.status(400).json({
        message: 'Cart not found',
      });
    }

    const productData = req.body.productData;
    const existingProductIndex = cart[productData.type].findIndex(
      (product) => product._id.toString() === productData.id,
    );
    if (existingProductIndex !== -1) {
      // Product already exists in the cart, modify the quantity
      cart[productData.type][existingProductIndex].quantity = productData.quantity;
    } else {
      const newProduct = {
        name: productData.name,
        price: productData.price,
        quantity: productData.quantity,
        _id: productData.id,
      };

      cart[productData.type].push(newProduct);
    }

    await cart.save();
    res.status(200).json({
      message: 'Cart updated!',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};


exports.userCart = async (req, res) => {
  try {
    // const userData = userFromToken(req);
    // const id = userData.id;
    // Remove below code when testing done
    const id = '64670433aac03b50b8029d73';
    const cart = await Cart.find({ userId: id });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};
