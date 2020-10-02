import React, { useState } from 'react'

const FilterData = ({ filter, handleFilter }) => {
  return (
    <div>
      filter shown with: <input value={filter} onChange={handleFilter} />
    </div>
  )
}

const PersonForm = ({handleNewPerson, handleNewName, handleNewNumber, newName, newNumber}) => {
  return (
    <div>
      <form onSubmit={handleNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Person = ({ person }) => {
  return (
    <div>
      <span>
        {person.name}
      </span>
      <span>  //  </span> 
      <span>
        {person.number}
      </span>
    </div>
  )
}

const PersonsData = ({ persons }) => {
  return (
    <div>
      {persons.map(person => 
        <Person key={person.name} person={person} />  
      )}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filterData, setFilterData ] = useState('')
  const [ filteredPersons, setFilteredPersons ] = useState([])

  const handleFilter = (event) => {
    setFilterData(event.target.value);
    // if you use filterData below for filtering, it creates some kind of weird dependency between states
    // and filter doesn't work properly
    setFilteredPersons(persons.filter( person => person.name.toLowerCase().includes(event.target.value.toLowerCase()) ));
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewPerson = (event) => {
    event.preventDefault();
    const newPerson = {
        name: newName,
        number: newNumber,
    }
    if (persons.findIndex(person => person.name === newName) != -1) {
        alert(`${newName} is already in the phonebook`);
        return
    }

    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterData filter={filterData} handleFilter={handleFilter} />
      <h2>Add new</h2>
      <PersonForm newName={newName} newNumber={newNumber} 
        handleNewName={handleNewName} handleNewNumber={handleNewNumber}
        handleNewPerson={handleNewPerson} />
      <h2>Numbers</h2>
      <PersonsData persons={filterData === '' ? persons : filteredPersons} />
    </div>
  )
}

export default App