const express = require('express');

const router = express.Router();

router.get('/', () => {
  console.log('hello');
});

module.exports = router;
