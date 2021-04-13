import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name === "") return

    const url = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`
    axios.get(url)
      .then(res => {
        setCountry({
          data: res.data[0], 
          found: true
        })
      })
      .catch(err => {
        setCountry({
          found: false
        })
      })
  }, [name])

  return country
}