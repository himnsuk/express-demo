const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  // res.send("Hello World!!!");
  /**
   * Template Engine render
   *
   */
  res.render('index', { title: 'My Express App', message: 'This is a simple Hello World'});
})

module.exports = router;
