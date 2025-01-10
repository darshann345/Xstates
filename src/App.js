import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const getCountryData = async () => {
      try {
        const response = await fetch(
          `https://crio-location-selector.onrender.com/countries`
        );
        if (!response.ok) throw new Error('Failed to fetch countries');
        const data = await response.json();
        setCountries(data);
        setError('');
      } catch (error) {
        console.error('Error fetching countries:', error);
        setError('Failed to fetch countries. Please try again later.');
      }
    };
    getCountryData();
  }, []);

  const handleCountryChange = async (event) => {
    const country = event.target.value;
    setSelectedCountry(country);
    setSelectedState('');
    setSelectedCity('');
    setStates([]);
    setCities([]);

    if (country) {
      try {
        const response = await fetch(
          `https://crio-location-selector.onrender.com/country=${country}/states`
        );
        if (!response.ok) throw new Error('Failed to fetch states');
        const data = await response.json();
        setStates(data);
        setError('');
      } catch (error) {
        console.error('Error fetching states:', error);
        setError('Failed to fetch states. Please try again later.');
      }
    }
  };

  const handleStateChange = async (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setSelectedCity('');
    setCities([]);

    if (state) {
      try {
        const response = await fetch(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${state}/cities`
        );
        if (!response.ok) throw new Error('Failed to fetch cities');
        const data = await response.json();
        setCities(data);
        setError('');
      } catch (error) {
        console.error('Error fetching cities:', error);
        setError('Failed to fetch cities. Please try again later.');
      }
    }
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div>
      <h1 style={{ display: 'flex', justifyContent: 'center' }}>Select Location</h1>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <div
        style={{ display: 'flex', justifyContent: 'space-around', gap: '20px' }}
      >
        <select value={selectedCountry} onChange={handleCountryChange}>
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        <select
          value={selectedState}
          onChange={handleStateChange}
          disabled={states.length === 0}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select
          value={selectedCity}
          onChange={handleCityChange}
          disabled={cities.length === 0}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {selectedCity && (
        <p>
          <b>
            You selected <span style={{ fontSize: 20 }}>{selectedCity}</span>,{' '}
            <span style={{ color: 'grey' }}>
              {selectedState}, {selectedCountry}
            </span>
          </b>
        </p>
      )}
    </div>
  );
}
