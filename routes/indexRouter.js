const express = require('express');
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

module.exports = router;