const mongoose = require('mongoose');

// try {
//   await mongoose.connect("mongodb://127.0.0.1:27017/scratchDB");
// } catch (error) {
//   console.log(err)
// }

mongoose
.connect("mongodb://127.0.0.1:27017/scratchDB")
.then(()=>{
  console.log('Mongodb connected');
})
.catch((err)=>{
  console.log(`Mongodb connection failed: ${err}`)
})

module.exports = mongoose.connection;