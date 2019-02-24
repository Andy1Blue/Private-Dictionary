const crypto = require('crypto');
const config = require('../config');
const db = require('./db');

const helpers = {};

helpers.hash = (str) => {
  if(typeof(str) == 'string' && str.length > 0) {
    const hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
    return hash;
  } else {
    return false;
  }
};

helpers.parseJsonToObject = (str) => {
  try {
    const obj = JSON.parse(str);
    return obj;
  } catch (e) {
    return {};
  }
};

helpers.createRandomString = (strLength) => {
  strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
  if(strLength) {
    const posaibleCharacters = 'abcdefghijklmnoprstquwyz0123456789ABCDEFGHIJKLMNOPQRSTUWXYZ';
    let str = '';
    for(i = 1; i <= strLength; i++) {
      const randomCharacter = posaibleCharacters.charAt(Math.floor(Math.random() * posaibleCharacters.length));
      str += randomCharacter;
    }
    return str;
  }
};

helpers.verifyToken = (id, email, callback) => {
  _data.read('tokens', id, (err, tokenData) => {
    if(!err && tokenData) {
      tokenData = helpers.parseJsonToObject(tokenData)
      if(tokenData.email == email && tokenData.expires > Date.now()) {
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  });
};

module.exports = helpers;
