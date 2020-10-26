require('dotenv').config()
const cors = require('cors')
const { response, request } = require('express')
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()
app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

//
// INDEX PAGE
//
app.get('/', (request, response) => {
    console.log('reached /');
    response.send('<h1>Hello world</h1>')
})

//
// GET ALL PERSONS
//
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

//
// ADD A NEW PERSON
//
app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => next(error))
})

//
// GET PERSON AT A SPECIFIC ID
//
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if(person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => {
            next(error)
        })
})

//
// DELETE PERSON FROM DB
//
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => {
            next(error)
        })
})

//
// UPDATE PERSON NUMBER
//
app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    const person = {
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => {
            next(error)
        })
})

//
// INFO ABOUT THE BACKEND
//
app.get('/info', (request, response, next) => {
    Person.estimatedDocumentCount({}, (error, result) => {
        if (error) {
            next(error)
        } else {
            response.send(`<p>Phonebook has info for ${result} people</p><p>${new Date()}</p>`)
        }
    })
})

//
// ERROR HANDLERS
//

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.log(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})