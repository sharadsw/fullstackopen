const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('passwd pls')
    process.exit(1)
}

const passwd = process.argv[2]
const db = 'test'
const url = `mongodb+srv://fullstack:${passwd}@cluster0.zqfal.mongodb.net/${db}?retryWrites=true&w=majority`

console.log('connecting to db', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', phonebookSchema)

const createPerson = (name, number) => {
    const person = new Person({
        name: name,
        number: number
    })
    person.save().then(() => {
        console.log(`added ${person.name} number ${person.number} to the phonebook`)
        mongoose.connection.close()
    })
}

const fetchAll = () => {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}

if (process.argv.length === 3) {
    console.log('phonebook:')
    fetchAll()
}

if (process.argv.length === 5) {
    createPerson(process.argv[3], process.argv[4])
}