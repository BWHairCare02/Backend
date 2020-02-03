const bc = require('bcryptjs');
const router = require('express').Router();
const jwt = require('jsonwebtoken')
const authenticate = require('../customers/authenticate-middleware')

const {jwtSecret} = require('../config/secrets')

const Stylists = require("./stylist-model")

router.post('/register', (req, res) => {
    let user = req.body;

    const hash = bc.hashSync(user.password, 8);

    user.password = hash;

    Stylists.add(user)
        .then(saved => res.status(201).json(saved))
        .catch(err => res.status(500).json(err))
})

router.post('/login', (req, res) => {
    let { username, password } = req.body;
  
    Stylists.findBy({ username })
      .first()
      .then(user => {
        if (user && bc.compareSync(password, user.password)) {
          const token = signToken(user)
  
          res.status(200).json({ message: `Welcome ${user.username}`, token, user: user})
        } else {
          res.status(401).json({ message: 'Invalid credentials' })
        }
      })
      .catch(err => res.status(500).json(err))
  });

  router.get('/', authenticate, (req, res) => {
    Stylists.get()
      .then(stylists => res.status(200).json(stylists))
      .catch(err => res.status(500).json(err))
  })

  router.get('/:id', authenticate, (req, res) => {
    Stylists.
  })
  
  function signToken(user) {
    const payload = {
      subject: user.id,
      username: user.username
    }
  
    const options = {
      expiresIn: '7d'
    }
  
    return jwt.sign(payload, jwtSecret, options)
  }
  
  module.exports = router;