const express = require('express');
const router = express.Router();
var log = require('log4js').getLogger("index");

router.get('/', (req, res) => {
  log.debug("This is in the index module");
  res.send('Hello World! :)')
});

module.exports = router
