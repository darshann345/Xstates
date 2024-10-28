import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://crio-location-selector.onrender.com/countries"
        );
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const handleCountryChange = async (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setSelectedState("");
    setSelectedCity("");

    if (country) {
      try {
        const response = await fetch(`
          https://crio-location-selector.onrender.com/country=${country}/states`
        );
        const data = await response.json();
        setStates(data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    } else {
      setStates([]);
    }
  };

  const handleStateChange = async (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedCity("");

    if (state) {
      try {
        const response = await fetch(`
          https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${state}/cities`
        );
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    } else {
      setCities([]);
    }
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div className="location-selector" style={{ textAlign: "center" }}>
      <h1>Select Location</h1>
      <div>
        <label></label>
        <select value={selectedCountry} onChange={handleCountryChange}>
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        &ensp;
        <select
          value={selectedState}
          onChange={handleStateChange}
          disabled={!selectedCountry}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        &ensp;
        <select
          value={selectedCity}
          onChange={handleCityChange}
          disabled={!selectedState}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {selectedCity ? (
        <p>
          <b>
            You selected <span style={{ fontSize: 20 }}>{selectedCity}</span>,{" "}
            <span style={{ color: "grey" }}>
              {selectedState}, {selectedCountry}
            </span>
          </b>
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default App;
