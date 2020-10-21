const cors = require('cors')
const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Kendrick Lamar",
      "number": "15-15-666",
      "id": 4
    },
    {
      "name": "Mary Poppins",
      "number": "1117",
      "id": 5
    },
]

app.get('/', (request, response) => {
    console.log('reached /');
    response.send('<h1>Hello world</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(100000)
    }

    if (persons.find(p => p.name === person.name)) {
        console.log("dupe name");
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    persons = persons.concat(person)
    console.log("person added");
    response.json(person)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
})

const generateId = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})