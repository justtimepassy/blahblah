import React, { useEffect, useState } from 'react';

// Helper function to convert temperature between Celsius and Fahrenheit
const convertTemperature = (temp, toFahrenheit) => {
  return toFahrenheit ? (temp * 9/5) + 32 : temp;
};

// Component to display weather details
const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [tempUnit, setTempUnit] = useState('C'); // Celsius by default
  const [selectedDate, setSelectedDate] = useState(new Date());

  const lat = "17.78252";
  const long = "83.385115";

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relative_humidity_2m,rain,showers,weather_code,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_direction_80m,wind_gusts_10m,temperature_80m`; // Replace with your API endpoint
      
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        
        // Process the data
        const now = new Date();
        const hour = now.getHours();
        const tempCelsius = data.hourly.temperature_2m[hour];
        const waterTempCelsius = data.hourly.temperature_80m[hour];
        const windSpeedKmh = data.hourly.wind_speed_10m[hour];
        const waveHeight = (data.hourly.wind_speed_10m[hour] ** 2) / 9.81; // Simplified

        setWeatherData({
          airTemperature: convertTemperature(tempCelsius, tempUnit === 'F'),
          waterTemperature: convertTemperature(waterTempCelsius, tempUnit === 'F'),
          windSpeed: windSpeedKmh / 3.6, // Convert km/h to m/s
          waveHeight
        });
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, [tempUnit]);

  const toggleTempUnit = () => {
    setTempUnit(tempUnit === 'C' ? 'F' : 'C');
  };

  const generateDateRange = () => {
    const today = new Date();
    const dates = [];
    for (let i = 0; i < 8; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toDateString());
    }
    return dates;
  };

  if (!weatherData) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Weather Forecast</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Select Date</h2>
        <div className="flex overflow-x-auto space-x-2 p-2">
          {generateDateRange().map((date, index) => (
            <button
              key={index}
              onClick={() => setSelectedDate(new Date(date))}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded"
            >
              {date}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Weather Details</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>🌡️ Air Temperature: {weatherData.airTemperature.toFixed(1)}°{tempUnit}</li>
          <li>🌊 Water Temperature: {weatherData.waterTemperature.toFixed(1)}°{tempUnit}</li>
          <li>💨 Wind Speed: {weatherData.windSpeed.toFixed(1)} m/s</li>
          <li>🌊 Wave Height: {weatherData.waveHeight.toFixed(2)} m</li>
        </ul>
        <button
          onClick={toggleTempUnit}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Switch to °{tempUnit === 'C' ? 'F' : 'C'}
        </button>
      </div>
    </div>
  );
};

export default WeatherComponent;
