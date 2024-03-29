const Cart = require('../models/Cart');
const userFromToken = require('../utils/userFromToken');
const mongoose = require('mongoose');

exports.addProduct = async (req, res) => {
  try {
    const userData = userFromToken(req);
    const id = userData.id;
    const cart = await Cart.findOne({ userId: id });
    if (!cart) {
      return res.status(400).json({
        message: 'Cart not found',
      });
    }
    // -- Handle Adding Cart Logic -- //
    const productData = req.body;
    if (productData.type === 'pizza') {
      const sameIdProductList = cart.productList.filter(
        (product) => product.productId.toString() === productData.productId,
      );
      if (sameIdProductList.length === 0) {
        let multiplePrice = 1;
        switch (productData.size) {
          case 'M':
            multiplePrice = 1.5;
            break;
          case 'L':
            multiplePrice = 2;
            break;
          default:
            multiplePrice = 1;
        }
        const totalPrice = multiplePrice * productData.price;
        const newProduct = {
          _id: new mongoose.Types.ObjectId(),
          name: productData.name,
          price: totalPrice,
          quantity: productData.quantity,
          productId: new mongoose.Types.ObjectId(productData.productId),
          type: productData.type,
          size: productData.size,
          toppingList: productData.toppingList,
        };
        cart.productList.push(newProduct);
      } else {
        // Find products with same topping list, if not, then create new
        let check = false;
        for (let i = 0; i < sameIdProductList.length; i++) {
          let string1 = JSON.stringify(sameIdProductList[i].toppingList.sort());
          let string2 = JSON.stringify(productData.toppingList.sort());
          if (string1 === string2 && productData.name === sameIdProductList[i].name) {
            let index = cart.productList.findIndex(
              (product) => JSON.stringify(product.toppingList.sort()) === JSON.stringify(productData.toppingList.sort()));
            cart.productList[index].quantity += 1;
            check = true;
            break;
          }
        }
        if (!check) {
          let multiplePrice = 1;
          switch (productData.size) {
            case 'M':
              multiplePrice = 1.5;
              break;
            case 'L':
              multiplePrice = 2;
              break;
            default:
              multiplePrice = 1;
          }
          const totalPrice = multiplePrice * productData.price;
          const newProduct = {
            _id: new mongoose.Types.ObjectId(),
            name: productData.name,
            price: totalPrice,
            quantity: productData.quantity,
            productId: new mongoose.Types.ObjectId(productData.productId),
            type: productData.type,
            size: productData.size,
            toppingList: productData.toppingList,
          };
          cart.productList.push(newProduct);
        }
      }
    } else {
      let productIndex = cart.productList.findIndex(
        (product) => {
          let stringId = product.productId.toString();
          return stringId === productData.productId;
        },
      );
      if (productIndex !== -1) {
        cart.productList[productIndex].quantity += 1;
      } else {
        const newProduct = {
          _id: new mongoose.Types.ObjectId(),
          name: productData.name,
          price: productData.price,
          quantity: 1,
          productId: new mongoose.Types.ObjectId(productData.productId),
          type: productData.type,
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
};

exports.removeProduct = async (req, res) => {
  try {
    const userData = userFromToken(req);
    const id = userData.id;
    const cart = await Cart.findOne({ userId: id });
    if (!cart) {
      return res.status(400).json({
        message: 'Cart not found',
      });
    }

    // -- Handle Removing Product from Cart Logic -- //
    const productIdToRemove = req.body._id; // Assuming you pass the product ID in the request body

    // Find the index of the product with the matching ID in the cart's productList array
    const productIndex = cart.productList.findIndex(
      (product) => product._id.toString() === productIdToRemove,
    );

    // If the product is not found in the cart, return an error response
    if (productIndex === -1) {
      return res.status(404).json({
        message: 'Product not found in the cart',
      });
    }

    // Decrement the quantity of the product by 1
    cart.productList[productIndex].quantity--;

    // If the updated quantity is 0, remove the product from the cart
    if (cart.productList[productIndex].quantity === 0) {
      cart.productList.splice(productIndex, 1);
    }

    await cart.save();
    res.status(200).json({
      cartData: cart,
      message: 'Cart updated!',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err.toString(),
    });
  }
};

exports.userCart = async (req, res) => {
  try {
    const userData = userFromToken(req);
    const id = userData.id;
    const cart = await Cart.findOne({ userId: id });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};
