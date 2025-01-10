import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    const getCountryData = async () => {
      try {
        const response = await fetch(`https://crio-location-selector.onrender.com/countries`);
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error: Failed to fetch Countries data', error);
      }
    };
    getCountryData();
  }, []);

  const handleCountryChange = async (event) => {
    const country = event.target.value;
    setSelectedCountry(country);
    setSelectedState('');
    setSelectedCity('');
    if (country) {
      try {
        const response = await fetch(`https://crio-location-selector.onrender.com/country/${country}/states`);
        const data = await response.json();
        setStates(data);
      } catch (error) {
        console.error('Error: Failed to fetch States', error);
      }
    } else {
      setStates([]);
    }
  };

  const handleStateChange = async (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setSelectedCity('');
    if (state) {
      try {
        const response = await fetch(`https://crio-location-selector.onrender.com/country/${selectedCountry}/state/${state}/cities`);
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error('Error: Failed to fetch Cities', error);
      }
    } else {
      setCities([]);
    }
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div>
      <h1 style={{ display: 'flex', justifyContent: 'center' }}>
        Select Location
      </h1>
      <div style={{ display: 'flex', justifyContent: 'space-around', gap: '20px' }}>
        <select value={selectedCountry} onChange={handleCountryChange}>
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <select value={selectedState} onChange={handleStateChange} disabled={states.length === 0}>
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        <select value={selectedCity} onChange={handleCityChange} disabled={cities.length === 0}>
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      {selectedCity && selectedState && selectedCountry && (
        <p>
          <b>
            You selected <span style={{ fontSize: 20 }}>{selectedCity}</span>,{' '}
            <span style={{ color: 'grey' }}>
              {selectedState} , {selectedCountry}
            </span>
          </b>
        </p>
      )}
    </div>
  );
}
