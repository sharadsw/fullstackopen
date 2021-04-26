const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { user: 0 })

  response.json(users)
})

usersRouter.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).populate('blogs', { user: 0 })

  res.json(user)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.username || !body.password) {
    response.status(400).json({
      'error': 'username or password missing'
    })
  }

  if (body.password.length < 3) {
    response.status(400).json({
      'error': 'password must be at least 3 characters long'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter