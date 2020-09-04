import React, { useState, useEffect } from 'react'
import axios from 'axios'

let api_key = 'aa2da0804d5e4ab5728a8c60d5fa170f'


const baseUrl = `http://api.weatherstack.com/current?access_key=${api_key}&query=`

console.log(baseUrl)
const useField = (type) => {
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

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    console.log('effect')
    axios
      .get(`https://restcountries.eu/rest/v2/name/` + encodeURI(name) )
      .then(response => {
        console.log('promise fulfilled', response.data)
        setCountry({...response.data[0], found: true})  
      })
  }, [name])
  
  return country
}

const Country = ({ country }) => {
  console.log(country)
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div> 
      <img src={country.flag} height='100' alt={`flag of ${country.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App