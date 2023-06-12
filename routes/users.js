// routes/users.js

const express = require('express');
const router = express.Router();
const passport = require('../auth');

// routes/users.js

router.post(
  '/singin',
  passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/singin',
    failureFlash: true,
  })
);


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;