import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherComponent = () => {
    const [weatherData, setWeatherData] = useState({
        time: [],
        temperature_2m_max: [],
        water_temperature: [],
        wind_speed_10m_max: [],
        wave_height: []
    });
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [tempUnit, setTempUnit] = useState('C');

    // Fetch weather data from API
    const fetchWeatherData = () => {
        const lat = "17.78252"; // Example latitude
        const long = "83.385115"; // Example longitude
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=temperature_2m_max,temperature_2m_min,water_temperature,wind_speed_10m_max,wave_height&timezone=Asia%2FKolkata`;
        
        axios.get(url)
            .then(response => {
                // Log the API response
                console.log('API Response:', response.data);

                // Update state with the API data
                setWeatherData(response.data.daily);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    };

    useEffect(() => {
        fetchWeatherData();
    }, []);

    // Convert temperatures from Celsius to Fahrenheit
    const convertToFahrenheit = (tempC) => (tempC * 9/5) + 32;

    // Format date to readable format
    const formatDate = (date) => new Date(date).toLocaleDateString();

    // Get data for selected date
    const getWeatherDetails = (date) => {
        const index = weatherData.time.findIndex(d => d === date);
        if (index !== -1) {
            return {
                airTemp: weatherData.temperature_2m_max[index],
                waterTemp: weatherData.water_temperature[index],
                windSpeed: weatherData.wind_speed_10m_max[index],
                waveHeight: weatherData.wave_height[index],
            };
        }
        return {
            airTemp: 'N/A',
            waterTemp: 'N/A',
            windSpeed: 'N/A',
            waveHeight: 'N/A'
        };
    };

    const details = getWeatherDetails(selectedDate);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        focusOnSelect: true,
    };

    return (
        <div className="weather-component">
            {/* Date Slider */}
            <div className="date-slider mb-4">
                {/* Ensure date-slider component is working */}
                {weatherData.time.length > 0 ? (
                    <Slider {...settings}>
                        {weatherData.time.map((date, index) => (
                            <div 
                                key={index} 
                                className={`date-slide ${selectedDate === date ? 'selected' : ''}`}
                                onClick={() => setSelectedDate(date)}
                            >
                                {formatDate(date)}
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <div>Loading dates...</div>
                )}
            </div>

            {/* Weather Details */}
            <div className="weather-details">
                <div className="flex justify-between mb-2">
                    <div>
                        <span role="img" aria-label="thermometer">🌡️</span> Air Temp: {tempUnit === 'C' ? details.airTemp : convertToFahrenheit(details.airTemp).toFixed(1)}°{tempUnit}
                    </div>
                    <div>
                        <span role="img" aria-label="thermometer">🌡️</span> Water Temp: {tempUnit === 'C' ? details.waterTemp : convertToFahrenheit(details.waterTemp).toFixed(1)}°{tempUnit}
                    </div>
                    <div>
                        <span role="img" aria-label="wind">💨</span> Wind Speed: {details.windSpeed} m/s
                    </div>
                    <div>
                        <span role="img" aria-label="wave">🌊</span> Wave Height: {details.waveHeight} m
                    </div>
                </div>

                {/* Temperature Unit Toggle */}
                <div className="flex justify-center mt-4">
                    <button 
                        className={`px-4 py-2 rounded ${tempUnit === 'C' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                        onClick={() => setTempUnit('C')}
                    >
                        °C
                    </button>
                    <button 
                        className={`px-4 py-2 rounded ${tempUnit === 'F' ? 'bg-blue-500 text-white' : 'bg-gray-300'} ml-2`}
                        onClick={() => setTempUnit('F')}
                    >
                        °F
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WeatherComponent;
