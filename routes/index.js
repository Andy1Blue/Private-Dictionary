const express = require('express');
const db = require('../lib/db');
const decode = require('unescape');
const router = express.Router();
const login = require('../lib/api/login');
// var pdfMake = require('pdfmake');

var dbstatus = false;
var words = [];
var contentToPdf;

router.all('/login', (req, res) => {
  login.init(req, res);
});

/* GET homepage pagination */
router.get('/page=:page', function (req, res, next) {
  let pageLimit = 10; // number of records per page
  let offset = 0;
  let allWords;
  let pages;
  let getPage = escape(req.params.page);

  if (isNaN(getPage)) {
    throw new Error("Nieprawidłowa strona!");
  }

  db.countAllWords(function (err, rows) {
    if (err) throw new Error("Nie zaleziono strony!");
    allWords = rows[0].wordsCount;
    pages = Math.ceil(allWords / pageLimit);

    if (getPage > pages) {
      res.redirect('/page=1');
    } else {

      console.log(allWords + " / " + pageLimit + " / " + pages);
      offset = pageLimit * (getPage - 1);

      db.getAllWordsWithPagination(pageLimit, offset, function (err, results) {
        if (err) throw new Error("Nie zaleziono strony!");
        res.render('index', {
          title: 'Private dictionary',
          dbstatus: dbstatus,
          data: results,
          pages: pages,
          allWords: allWords
        });
        //contentToPdf = results;
        // console.log(contentToPdf);

        //PDF GEN TESTING
        // var fonts = {
        //   Roboto: {
        //     normal: 'fonts/Roboto-Regular.ttf',
        //     bold: 'fonts/Roboto-Medium.ttf',
        //     italics: 'fonts/Roboto-Italic.ttf',
        //     bolditalics: 'fonts/Roboto-MediumItalic.ttf'
        //   }
        // };

        // var PdfPrinter = require('pdfmake');
        // var printer = new PdfPrinter(fonts);
        // var fs = require('fs');

        // var itemsToPdf = "a ";
        // for(let p=0;p<results.length;p++) {
        //   itemsToPdf += results[p].word_one+" - "+ results[p].word_two + " [" + results[p].word_three +"]\n";
        // }

        // var docDefinition = {
        //   content: [
        //     { text: 'Lista słówek: ', style: 'header' },
        //     { text: itemsToPdf, style: 'text' },
        //   ],

        //   styles: {
        //     header: {
        //       fontSize: 20,
        //       bold: true
        //     },
        //      text: {
        //       fontSize: 16,
        //       alignment: 'justify'
        //      }
        // }
        // };

        // var now = new Date();
        //  var pdfDoc = printer.createPdfKitDocument(docDefinition);
        //  pdfDoc.pipe(fs.createWriteStream('pdfs/absolute.pdf'));
        //  pdfDoc.createPdf(docDefinition).download();
        // pdfDoc.end();
        //////////////////////////////
      });
    }
  });
});

/* GET homepage */
router.get('/', function (req, res, next) {
  db.getAllWords(function (err, results) {
    if (err) throw new Error("Nie zaleziono strony!");
    res.render('index', {
      title: 'Private dictionary',
      dbstatus: dbstatus,
      data: results
    });
  });
  //contentToPdf = results;
  // console.log(contentToPdf);
  res.redirect('/page=1');
});

/* ADD new word */
router.post('/add', function (req, res, next) {
  db.addWords(req.body.wordOne.trim(), req.body.wordTwo.trim(), req.body.wordThree.trim(), 'nodejs appliaction', function (err, results) {
    if (err) throw new Error("Nie zaleziono strony!");
    res.redirect('/page=1');
  });
});

/* DELETE word */
router.post('/delete', function (req, res, next) {
  var wordIdFromPost = req.body.wordId;
  db.deleteWord(wordIdFromPost, function (err, results) {
    if (err) throw new Error("Nie zaleziono strony!");
    res.redirect('/page=1');
  });
});

/* UPDATE word one*/
router.post('/updateWordOne', function (req, res, next) {
  db.updateWordOne(req.body.wordId, req.body.wordOneNew.trim(), function (err, results) {
    if (err) throw new Error("Nie zaleziono strony!");
    res.redirect('/page=1');
  });
});

/* UPDATE word two*/
router.post('/updateWordTwo', function (req, res, next) {
  db.updateWordTwo(req.body.wordId, req.body.wordTwoNew.trim(), function (err, results) {
    if (err) throw new Error("Nie zaleziono strony!");
    res.redirect('/page=1');
  });
});

/* UPDATE word three*/
router.post('/updateWordThree', function (req, res, next) {
  db.updateWordThree(req.body.wordId, req.body.wordThreeNew.trim(), function (err, results) {
    if (err) throw new Error("Nie zaleziono strony!");
    res.redirect('/page=1');
  });
});

module.exports = router;
