const express = require('express')
const router = express.Router()
const User = require('../models/user')
var log = require('log4js').getLogger("users")

// GET something that just errors
router.get('/broken', function(req, res) {
  log.error("Oh no, something has gone terribly wrong");
  res.error("aargh");
});

// Getting all users
router.get('/', async (req, res) => {
  try {
    log.debug("I'm in the users module.");
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
});

// Getting one user
async function getUser(req, res, next) {
  try {
    user = await User.findById(req.params.id)
    if (user == null) {
      return res.status(404).json({ message: 'Status 404: Cant find subscriber' })
    }
  } catch(err){
    return res.status(500).json({ message: err.message })
  }

  res.user = user
  next()
}

router.get('/:id', getUser, (req, res) => {
  res.json(res.user)
})

// Creating one user
router.post('/', async (req, res) => {
  const user = new User({
    firstname: req.body.firstname,
    surname: req.body.surname
  })

  try {
    const newUser = await user.save()
    return res.status(201).json({
      status: 201,
      error: 'Not found',
      message: 'User added',
      path: `/users/${user.id}`,
      user: newUser
    })
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
});

// // Updating one user
// router.patch('/:id', (req, res) => {
// })
//

// Deleting one user
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove()
    res.json({ message: 'Deleted This Subscriber' })
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
