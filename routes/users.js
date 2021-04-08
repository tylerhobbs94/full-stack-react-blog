var express = require('express');
var router = express.Router();
const models = require('../models')
const bcrypt = require('bcrypt')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Post /api/v1/users/register
router.post('/register', async (req,res) => {
// check for username and password on request.
if(!req.body.username || !req.body.password) {
  return res.status(400).json({
    error: 'Please include username and password'
  })
}
// check database for existing user
const user = await models.User.findOne({
  where: {
    username: req.body.username 
  }
})

  // if exists, send error
if (user) {
  return res.status(400).json({
    error: 'Username already in use'
  })
}
const hash = await bcrypt.hash(req.body.password, 10)
  // hash password

//create user
const newUser = await models.User.create({
  username: req.body.username,
  password: hash
})

// respond with success message
return res.status(201).json(newUser);
})

module.exports = router;

