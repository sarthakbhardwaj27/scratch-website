const userModel = require("../models/user-model");
const {generateToken} = require("../utils/generateToken");
const {generatePasswordHash} =  require("../utils/generatePasswordHash");
const bcrypt = require("bcrypt");

module.exports.registerUser = async function(req,res){
  try {
    let { email, fullname, password } = req.body;

    //check if the same user already exists
    let existingUser = await userModel.findOne({ email: email });
    if(existingUser){
      return res.status(401).send('user already exists with email: ' + email + ' kindly login');
    }

    //generate hash using controller
    let hash = await generatePasswordHash(password);
    
    //create new user in database
    let createdUser = await userModel.create({
      email,
      fullname,
      password: hash,
    });

    // generate jwt token
    if (createdUser) {
      let token = generateToken(createdUser)
      res.cookie("token", token);
      res
        .status(201)
        .send(`Successfully registered: ${createdUser.fullname}`);
      }
    }
    catch (error) {
    console.log(`Error while registering user: ${error}`);
    res.status(500).send(`${error}`);
  }
}

module.exports.loginUser = async function(req,res){
  let {email, password} = req.body;
  let user = await userModel.findOne({email});
  if(!user){
    res.status(404).send(`Email or password incorrect`);
  }
  bcrypt.compare(password,user.password,function(err,result){
    if(err) console.log(err);
    if(result){
      let token = generateToken(user);
      res.cookie("token", token);
      res
       .status(200)
       .redirect('/shop')
    }else{
      res.status(401).send(`Email or password incorrect`);
    }
  })

}

module.exports.logoutUser = async function(req,res){
  res.clearCookie("token");
  res.redirect('/')
}