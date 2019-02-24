var mysql = require('mysql');
var config = require('../config');

var pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database
});

let maxLength = 100;

/* READ FROM DB */
exports.read = (table, field, value) => {
  return new Promise((res, rej) => {
    const con = mysql.createConnection(config.db);
    if(field && value) {
      con.query(`Select * from ${table} WHERE ${field} = ?`, [value], (err, result, fields) => {
        if(!err && result && result.length > 0) {
          console.log(result);
          res(result);
        } else {
          rej({
            'Error': 'Could not find the specified record'
          });
        }
      });
    } else {
      con.query(`Select * from ${table}`, (err, result, fields) => {
        if(!err && result && result.length > 0) {
          res(result);
        } else {
          rej({
            'Error': 'Could not find the specified records'
          });
        }
      });
    }
    con.end();
  });
};

/* GET ALL */
exports.getAllWords = function(callback) {
  var sql = "SELECT * FROM dictionary_words ORDER BY id DESC";
  pool.getConnection(function(err, connection) {
    if(err) {
      console.log(err);
      callback(true);
      return;
    }
    connection.query(sql, function(err, results) {
      connection.release();
      if(err) {
        console.log(err);
        callback(true);
        return;
      }
      callback(false, results);
    });
  });
};

/* COUNT ALL */
exports.countAllWords = function(callback) {
  var sql = "SELECT COUNT(*) AS wordsCount FROM dictionary_words";
  pool.getConnection(function(err, connection) {
    if(err) {
      console.log(err);
      callback(true);
      return;
    }
    connection.query(sql, function(err, results) {
      connection.release();
      if(err) {
        console.log(err);
        callback(true);
        return;
      }
      callback(false, results);
    });
  });
};

/* GET ALL with pagination */
exports.getAllWordsWithPagination = function(limit, offset, callback) {
  var sql = "SELECT * FROM dictionary_words ORDER BY id DESC LIMIT " + limit + " OFFSET " + offset;
  pool.getConnection(function(err, connection) {
    if(err) {
      console.log(err);
      callback(true);
      return;
    }
    connection.query(sql, function(err, results) {
      connection.release();
      if(err) {
        console.log(err);
        callback(true);
        return;
      }
      callback(false, results);
    });
  });
};

/* ADD */
exports.addWords = function(wordOne, wordTwo, wordThree, user, callback) {
  if(wordOne.length > maxLength) {
    word = word.substring(0, maxLength);
  }
  if(wordTwo.length > maxLength) {
    word = word.substring(0, maxLength);
  }
  if(wordThree.length > maxLength) {
    word = word.substring(0, maxLength);
  }
  if(wordOne == null || wordOne == "" || wordOne == " ") {
    wordOne = "Uzupełnij!";
  }
  if(wordTwo == null || wordTwo == "" || wordTwo == " ") {
    wordTwo = "Uzupełnij!";
  }
  if(wordThree == null || wordThree == "" || wordThree == " ") {
    wordThree = "Uzupełnij!";
  }
  var sql = "INSERT INTO dictionary_words (word_one, word_two, word_three, user) VALUES ('" + escape(wordOne) + "', '" + escape(wordTwo) + "', '" + escape(wordThree) + "', '" + escape(user) + "')";
  pool.getConnection(function(err, connection) {
    if(err) {
      console.log(err);
      callback(true);
      return;
    }
    connection.query(sql, function(err, results) {
      connection.release();
      if(err) {
        console.log(err);
        callback(true);
        return;
      }
      callback(false, results);
    });
  });
};

/* DELETE BY ID */
exports.deleteWord = function(id, callback) {
  var sql = "DELETE FROM dictionary_words WHERE id = '" + escape(id) + "'";
  pool.getConnection(function(err, connection) {
    if(err) {
      console.log(err);
      callback(true);
      return;
    }
    connection.query(sql, function(err, results) {
      connection.release();
      if(err) {
        console.log(err);
        callback(true);
        return;
      }
      callback(false, results);
    });
  });
};

/* UPDATE BY ID */
exports.updateWordOne = function(id, word, callback) {
  if(word == null || word == "" || word == " ") {
    word = "Uzupełnij!";
  }
  if(word.length > maxLength) {
    word = word.substring(0, maxLength);
  }
  var sql = "UPDATE dictionary_words SET word_one = '" + escape(word) + "' WHERE id = '" + escape(id) + "'";
  pool.getConnection(function(err, connection) {
    if(err) {
      console.log(err);
      callback(true);
      return;
    }
    connection.query(sql, function(err, results) {
      connection.release();
      if(err) {
        console.log(err);
        callback(true);
        return;
      }
      callback(false, results);
    });
  });
};

exports.updateWordTwo = function(id, word, callback) {
  if(word == null || word == "" || word == " ") {
    word = "Uzupełnij!";
  }
  if(word.length > maxLength) {
    word = word.substring(0, maxLength);
  }
  var sql = "UPDATE dictionary_words SET word_two = '" + escape(word) + "' WHERE id = '" + escape(id) + "'";
  pool.getConnection(function(err, connection) {
    if(err) {
      console.log(err);
      callback(true);
      return;
    }
    connection.query(sql, function(err, results) {
      connection.release();
      if(err) {
        console.log(err);
        callback(true);
        return;
      }
      callback(false, results);
    });
  });
};

exports.updateWordThree = function(id, word, callback) {
  if(word == null || word == "" || word == " ") {
    word = "Uzupełnij!";
  }
  if(word.length > maxLength) {
    word = word.substring(0, maxLength);
  }
  var sql = "UPDATE dictionary_words SET word_three = '" + escape(word) + "' WHERE id = '" + escape(id) + "'";
  pool.getConnection(function(err, connection) {
    if(err) {
      console.log(err);
      callback(true);
      return;
    }
    connection.query(sql, function(err, results) {
      connection.release();
      if(err) {
        console.log(err);
        callback(true);
        return;
      }
      callback(false, results);
    });
  });
};
