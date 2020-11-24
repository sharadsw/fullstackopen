const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})

  response.json(users)
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