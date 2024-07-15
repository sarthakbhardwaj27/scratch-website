const mongoose = require("mongoose");

// try {
//   mongoose.connect("mongodb://127.0.0.1:27017/scratchDB");
// } catch (error) {
//   console.log(err)
// }

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  cart: {
    type: Array,
    default: []
  },
  orders: {
    type: Array,
    default: []
  },
  contact: Number,
  contact: Number,
  picture: String
})

module.exports = mongoose.model("user",userSchema);