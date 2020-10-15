import React from 'react'

const Person = ({ person, removeEvent }) => {      
    return (
      <div>
        <span>
          {person.name}
        </span>
        &nbsp; 
        <span>
          {person.number}
        </span>
        &nbsp;
        <button onClick={removeEvent}>delete</button>
      </div>
    )
  }
  
const PersonsData = ({ persons, removeEvent }) => {
    return (
      <div>
        {persons.map(person => 
          <Person key={person.name} person={person} removeEvent={() => removeEvent(person)} />  
        )}
      </div>
    )
}

export default PersonsData
