const Cart = require('../models/Cart');
const userFromToken = require('../utils/userFromToken');
const mongoose = require('mongoose');

exports.addProduct = async (req, res) => {
  try {
    // -- Find Cart -- //

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
    // -- Handle Adding Cart Logic -- //
    const productData = req.body.productData;
    if (productData.type === 'pizza') {
      const sameIdProductList = cart.productList.filter(
        (product) => product.productId.toString() === productData.productId
        );
      if (sameIdProductList.length === 0) {
        const newProduct = {
          _id: new mongoose.Types.ObjectId(),
          name: productData.name,
          price: productData.price,
          quantity: productData.quantity,
          productId: new mongoose.Types.ObjectId(productData.productId),
          type: productData.type,
          size: productData.size,
          toppingList: productData.toppingList
        };
        cart.productList.push(newProduct);
      } else {
        // Find products with same topping list, if not, then create new
        let check = false;
        for (let i = 0; i < sameIdProductList.length; i++) {
          let string1 = JSON.stringify(sameIdProductList[i].toppingList.sort())
          let string2 = JSON.stringify(productData.toppingList.sort())
          if (string1 === string2) {
            let index = cart.productList.findIndex(
              (product) => JSON.stringify(product.toppingList.sort()) === JSON.stringify(productData.toppingList.sort()));
            cart.productList[index].quantity += 1;
            check = true;
            break;
          }
        }
        if (!check) {
          const newProduct = {
            _id: new mongoose.Types.ObjectId(),
            name: productData.name,
            price: productData.price,
            quantity: productData.quantity,
            productId: new mongoose.Types.ObjectId(productData.productId),
            type: productData.type,
            size: productData.size,
            toppingList: productData.toppingList
          };
          cart.productList.push(newProduct);
        }
      }
    }
    else {
      let productIndex = cart.productList.findIndex(
        (product) => {
          let stringId = product.productId.toString();
          return stringId === productData.productId;
        }
      )
      if (productIndex !== -1) {
        cart.productList[productIndex].quantity += 1;
      } else {
        const newProduct = {
          _id: new mongoose.Types.ObjectId(),
          name: productData.name,
          price: productData.price,
          quantity: 1,
          productId: new mongoose.Types.ObjectId(productData.productId),
          type: productData.type
        };
        cart.productList.push(newProduct);
      }
    }
    await cart.save();
    res.status(200).json({
      cartData: cart,
      message: 'Cart updated!',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
}

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
    const existingProductIndex = cart.productList.findIndex(
      (product) => product._id.toString() === productData.id,
    );
    if (existingProductIndex !== -1) {
      // Product already exists in the cart, modify the quantity
      if (productData.type !== 'pizza') {
        cart.productList[existingProductIndex].quantity += productData.quantity;
      }
      else {

      }
    } else {
      if (productData.type !== 'pizza') {
        const newProduct = {
          name: productData.name,
          price: productData.price,
          quantity: productData.quantity,
          _id: productData.id,
          type: productData.type
        };
        cart[productData.type].push(newProduct);
      }
      else {
        const newProduct = {
          name: productData.name,
          price: productData.price,
          quantity: productData.quantity,
          _id: productData.id,
          type: productData.type,
          size: productData.size,
          toppingList: productData.toppingList
        };
        cart[productData.type].push(newProduct);
      }
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
    const cart = await Cart.findOne({ userId: id });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};
