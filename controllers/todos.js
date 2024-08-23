const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// Fake "protected" route that would require
// a logged in user.
// GET /todos/new
router.get('/new', ensureLoggedIn, (req, res) => {
  res.send('Logged in!');
});

module.exports = router;