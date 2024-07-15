const express = require('express');
const port = 3000;
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const mongodbConnection = require('./config/mongoose-connection');
const dotenv = require('dotenv');

//importing routes
const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const indexRouter = require('./routes/indexRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', "ejs");

app.get('/',indexRouter)
app.use('/owners',ownersRouter);
app.use('/users',usersRouter);
app.use('/products',productsRouter);
console.log(process.env.NODE_ENV)
app.listen(port, (err)=>{
  if(err) console.log(err);
  console.log(`Server is listening on ${port}`);
});