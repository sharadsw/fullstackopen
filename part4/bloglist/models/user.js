const mongoose = require('mongoose')
const uniqueVal = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: { type: String, unique: true, minlength: 3, required: true },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'Blog'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueVal)

const User = mongoose.model('User', userSchema)

module.exports = User