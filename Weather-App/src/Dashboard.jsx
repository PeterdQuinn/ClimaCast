import React, { useState, useEffect } from 'react';
import './app.css';

function Dashboard() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('London'); // Default location
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const endpoint = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error.message);
      }
    };

    fetchWeather();
  }, [location]);

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <h1>Weather App</h1>
      <input 
        type="text" 
        value={location} 
        onChange={(e) => setLocation(e.target.value)} 
        placeholder="Enter location"
      />
      <button onClick={() => setDarkMode(!darkMode)}>Toggle Dark Mode</button>
      {weatherData && (
        <div>
          <h2>{weatherData.location.name}, {weatherData.location.country}</h2>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Condition: {weatherData.current.condition.text}</p>
          <img src={weatherData.current.condition.icon} alt="Weather icon" />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
