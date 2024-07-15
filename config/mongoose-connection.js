require('dotenv').config();
const config = require('config')
const mongoose = require('mongoose');
const debug = require('debug')('development:mongoose');
// to remove debug var: here I have got the solution. So, basically to setup env variable in windows type this command ---> $env:DEBUG="development:*" And to remove the env setup type this ---> Remove-Item Env:DEBUG

mongoose
  .connect(`${config.get('MONGODB_URI')}/scratchDB`)
  .then(() => {
    debug('Mongodb connected');
  })
  .catch((err) => {
    debug(`Mongodb connection failed: ${err}`);
  });

module.exports = mongoose.connection;
