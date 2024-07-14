const express = require('express');
const port = 3000;
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const mongodbConnection = require('./config/mongoose-connection');

//importing routes
const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view enginer', "ejs");

app.use('/owners',ownersRouter);
app.use('/users',usersRouter);
app.use('/products',productsRouter);

app.listen(port, (err)=>{
  if(err) console.log(err);
  console.log(`Server is listening on ${port}`);
});