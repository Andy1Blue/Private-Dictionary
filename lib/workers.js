//Dependencies
const helpers = require('./helpers');
const _data = require('./dataFs');

//Instantiate the worker object
const workers = {};

//Lookup all checks, get their data, send to a validator
workers.gatherAllTokens = () => {
  console.log(Date.now())
  //Get all the tokens
  _data.list('tokens', (err, tokens) => {
    if(!err && tokens && tokens.length > 0) {
      console.log(tokens)
      tokens.forEach(token => {
        _data.read('tokens', token, (err, tokenData) => {
          if(!err && tokenData) {
            workers.checkTokenData(tokenData);
          } else {
            console.log('Error reading one of the tokens data');
          }
        });
      });
    } else {
      console.log('Nothing to read');
    }
  });
};

//Export the module
module.exports = workers;
