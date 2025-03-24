import React, { useState, useEffect } from 'react';

// TypeScript interfaces
interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

const App: React.FC = () => {
  // State declarations
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch weather data
  const fetchWeatherData = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Note: In a real app, you'd want to store this API key in an environment variable
      const apiKey = 'API_KEY_HERE'; // Replace with a real API key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data: WeatherData = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Get Weather'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}</h2>

          <div className="weather-main">
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
            />
            <div className="temperature">
              <h3>{Math.round(weatherData.main.temp)}°C</h3>
              <p>{weatherData.weather[0].main}</p>
              <p>{weatherData.weather[0].description}</p>
            </div>
          </div>

          <div className="weather-details">
            <div className="detail">
              <span>Feels Like</span>
              <span>{Math.round(weatherData.main.feels_like)}°C</span>
            </div>
            <div className="detail">
              <span>Humidity</span>
              <span>{weatherData.main.humidity}%</span>
            </div>
            <div className="detail">
              <span>Wind Speed</span>
              <span>{weatherData.wind.speed} m/s</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App; 