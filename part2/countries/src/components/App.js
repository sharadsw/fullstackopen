import React, { useState, useEffect } from 'react'
import axios from 'axios'

/* const Weather = ({ place, weather }) => {
    return (
        <div>
            <h3>
                Weather in {place}
            </h3>
            <div>
                <b>temperature:</b> {weather.temperature} Celsius 
            </div>
            <div>
                <img src={weather.weather_icons[0]} alt={weather.weather_descriptions[0]} />
            </div>
            <div>
                <b>wind:</b> {weather.wind_speed} mph direction {weather.wind_dir} 
            </div>            
        </div>
    )
} */

const Country = ({ country }) => {
    /* const api_key = process.env.REACT_APP_API_KEY
    const [ weather, setWeather ] = useState(null)

    useEffect(() => {
        console.log(api_key);
        axios
            .get('http://api.weatherstack.com/current?access_key=' + api_key + '&query=' + country.capital)
            .then(response => {
                setWeather(response.data);
                console.log(response.data);
            })
    }) */

   return (
       <div>
            <h1>{country.name}</h1>
            <span>
                capital {country.capital}
            </span><br></br>
            <span>
                population {country.population}
            </span>
            <h2>languages</h2>
            <ul>
                {country.languages.map(lang => 
                    <li key={lang.name}>{lang.name}</li> 
                )}
            </ul>
            <img src={country.flag} alt={country.name} width={100} height={100} />
            {/* {weather != null &&
                <Weather place={country.capital} weather={weather.current} />
            } */}
       </div>
   ) 
}

const CountryList = ({ country }) => {

    const [ toggle, setToggle ] = useState(false)

    return (
        <div>
            <span>
                {country.name}
            </span>
            <button onClick={() => setToggle(!toggle)}>
                show
            </button>
            {toggle &&
                <Country country={country} />
            }
        </div>
    )
}

const CountryDisplay = ({ countries }) => {
    if (countries.length === 0) {
        return (
            <div>
                <span>No matches</span>
            </div>
        )
    }
    if (countries.length > 10) {
        return (
            <div>
                <span>Too many matches, be more specific</span>
            </div>
        )
    }
    if (countries.length === 1) {
        return (
            <div>
                <Country country={countries[0]} />
            </div>
        )
    }

    return (
        <div>
            {countries.map(country =>
                <CountryList key={country.name} country={country} />
            )}
        </div>
    )
}

const CountryForm = ({ newCountry, handleNewCountry }) => {
    return (
        <div>
            <input value={newCountry} onChange={handleNewCountry} />
        </div>
    )
}

const App = () => {

    const [ countries, setCountries ] = useState([])
    const [ filterCountry, setFilterCountry ] = useState([])
    const [ newCountry, setNewCountry ] = useState('')

    const handleNewCountry = (event) => {
        setNewCountry(event.target.value);
        if (event.target.value === '') {
            setFilterCountry([])
            return
        }
        setFilterCountry(countries.filter(country => country.name.toLowerCase().includes(event.target.value.toLowerCase())))
    }

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log("response", response.data);
                setCountries(response.data);
            })
    }, [])

    return (
        <div>
            <h1>Find countries</h1>
            <CountryForm newCountry={newCountry} handleNewCountry={handleNewCountry} />
            <CountryDisplay countries={filterCountry} />
        </div>
    )
}

export default App