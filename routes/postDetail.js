const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('pages/postDetail', { siteName: 'nabeliwo blog' });
});

module.exports = router;
