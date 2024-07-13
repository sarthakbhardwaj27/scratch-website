const express = require('express');
const port = 3000;
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view enginer', "ejs");

app.get('/', (req, res) => {
  res.send('Welcome');
})
app.listen(port, (err)=>{
  if(err) console.log(err);
  console.log(`listening on ${port}`);
});