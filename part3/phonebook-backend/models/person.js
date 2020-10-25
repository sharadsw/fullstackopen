const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to db', url);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => {
        console.log('connected to mongodb');
    })
    .catch(error => {
        console.log('error in connection', error.message);
    })

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String
})

phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', phonebookSchema)