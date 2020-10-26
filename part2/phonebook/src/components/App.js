import React, { useState, useEffect } from 'react'
import PersonsData from './Person.js'
import contactService from '../services/contacts.js'
import Notification from './Notification.js'

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

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filterData, setFilterData ] = useState('')
  // const [ filteredPersons, setFilteredPersons ] = useState([])

  const [ errorMsg, setErrorMsg ] = useState(null)
  const [ alertMsg, setAlertMsg ] = useState(null)

  useEffect(() => {
    contactService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleFilter = (event) => {
    setFilterData(event.target.value);

    // COMMENTS BELOW ARE KEPT FOR FUTURE REFERENCE FOR MYSELF
    // filteredPersons has been removed as a state as it is unnecessary
    //
    // if you use filterData below for filtering, 
    // it creates some kind of weird dependency between states
    // and filter doesn't work properly
    // setFilteredPersons(persons.filter( person => person.name.toLowerCase().includes(event.target.value.toLowerCase())));
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
    // person already exists, just need to update
    if (persons.findIndex(person => person.name === newName) !== -1) {
        if (window.confirm(`${newName} is already in the phonebook, update number?`)) {
          const updatePerson = persons.find(p => p.name === newPerson.name)
          contactService
            .update(updatePerson.id, newPerson)
            .then(returnedPerson => {
              setPersons(persons.map(p => p.id === returnedPerson.id ? returnedPerson : p))
              // setFilteredPersons(filteredPersons.map(p => p.id === returnedPerson.id ? returnedPerson `: p))
              notify(`${returnedPerson.name}'s number was changed to ${returnedPerson.number}`, 'alert')
            })
            .catch(err => {
              console.log('error in update');
              if (err.response) {
                notify(err.response.data.error, 'error')
              } else {
                setPersons(persons.filter(p => p.id !== updatePerson.id))
                // setFilteredPersons(filteredPersons.filter(p => p.id !== updatePerson.id))
                notify(`${updatePerson.name} was already removed from the phonebook`, 'error')
              }
            })
        }
        return
    }

    // send to server
    contactService
      .create(newPerson)
      .then(returnedPerson => {
        console.log(returnedPerson);
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        notify(`${returnedPerson.name} was added to the phonebook`, 'alert')
      })
      .catch(error => {
        notify(error.response.data.error, 'error')
      })
  }

  const handleRemovePerson = (person) => {
    // event.preventDefault();
    if (window.confirm(`Delete ${person.name} from phonebook?`)) {
      const removePerson = persons.find(p => person.name === p.name)
      contactService
        .remove(removePerson.id)
        .then(res => {
          // console.log(res.status);
          setPersons(persons.filter(p => removePerson.id !== p.id))
          // setFilteredPersons(filteredPersons.filter(p => removePerson.id !== p.id))
          notify(`${removePerson.name} was removed from the phonebook`, 'alert')
        })
        .catch(err => {
          console.log('error caught in delete')
          setPersons(persons.filter(p => p.id !== removePerson.id))
          // setFilteredPersons(filteredPersons.filter(p => p.id !== removePerson.id))
          notify(`${removePerson.name} was already removed from the phonebook`, 'error')
        })
    }
  }

  const notify = (msg, type) => {
    if (type === 'alert') {
      setAlertMsg(msg)
      setTimeout(() => {
        setAlertMsg(null)
      }, 5000)
    }

    if (type === 'error') {
      setErrorMsg(msg)
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
    }
  }

  const personsToShow = filterData === '' ? persons : 
            persons.filter(person => person.name.toLowerCase().includes(filterData))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={alertMsg} type={'alert'} />
      <Notification message={errorMsg} type={'error'} />
      <FilterData filter={filterData} handleFilter={handleFilter} />
      <h2>Add new</h2>
      <PersonForm newName={newName} newNumber={newNumber} 
        handleNewName={handleNewName} handleNewNumber={handleNewNumber}
        handleNewPerson={handleNewPerson} />
      <h2>Numbers</h2>
      <PersonsData persons={personsToShow} removeEvent={handleRemovePerson} />
    </div>
  )
}

export default App