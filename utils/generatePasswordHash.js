const bcrypt = require('bcrypt');

const generatePasswordHash = async (password)=>{
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    console.log(`Error while generating hash: ${err.message}`);
    throw err;
  }
}

module.exports.generatePasswordHash = generatePasswordHash;