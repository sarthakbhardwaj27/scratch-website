const mongoose = require("mongoose");

try {
  mongoose.connect("mongodb://127.0.0.1:27017/scratchDB");
} catch (error) {
  console.log(err)
}

const userSchema = mongoose.Schema({
  fullname: String,
  email: String,
  email: String,
  password: String,
  cart: {
    type: Array,
    default: []
  },
  orders: {
    type: Array,
    default: []
  },
  contact: Number,
  isAdmin: Boolean,
  contact: Number,
  picture: String
})

module.exports = mongoose.model("user",userSchema);