const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('pages/index', { siteName: 'nabeliwo blog' });
});

module.exports = router;
