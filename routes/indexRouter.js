const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const isLoggedin = require('../middlewares/isLoggedin');
const productModel = require('../models/product-model');
const userModel =  require('../models/user-model');

router.get('/', function (req, res){
  let error = req.flash("error");
  res.render('index',{ error, isLoggedin: false});
})

router.get('/shop',isLoggedin,async function(req,res){
  let products = await productModel.find();
  let success = req.flash("success");
  res.render('shop',{products, success});
})

router.get('/addToCart/:productId', isLoggedin, async function(req, res){
  let user = await userModel.findOne({email: req.user.email})
  let productId = req.params.productId;
  user.cart.push(productId);
  await user.save();
  req.flash("success", "Item has been added to cart");
  res.redirect('/shop')
})

router.get('/removefromcart/:productId', isLoggedin, async function(req, res){
  try {
    let user = await userModel.findOne({email: req.user.email});
    let productId = req.params.productId;
    // Convert productId to ObjectId
    let objectIdProductId = new mongoose.Types.ObjectId(productId);

    // Find the index of the first occurrence of the item ID
    let index = user.cart.findIndex(id => id.equals(objectIdProductId));

    // If the item is found, remove it from the cart
    if (index !== -1) {
      user.cart.splice(index, 1);
      await user.save();
      req.flash("success", "Item has been removed from cart");
    } else {
      req.flash("error", "Item not found in cart");
    }

    res.redirect('/cart');
  } catch (err) {
    console.error(err);
    req.flash("error", "An error occurred while removing the item from the cart");
    res.redirect('/cart');
  }
});


router.get('/cart', isLoggedin, async function(req, res){
  let user = await userModel
    .findOne({email: req.user.email})
    .populate("cart")

  let cartTotal = 0;
  for(let i in user.cart){
    cartTotal = Number(cartTotal) + Number(user.cart[i].price) - Number(user.cart[i].discount);
  }
  const finalBill = cartTotal + 20;

  res.render('cart',{user, finalBill , cartTotal})
})

module.exports = router;