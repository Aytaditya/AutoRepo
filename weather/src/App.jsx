import './App.css';

function WeatherCard({ city, temperature }) {
  return (
    <div className="weather-card">
      <h2>{city}</h2>
      <p className="temp">{temperature}</p>
    </div>
  );
}

function App() {
  const cities = [
    { city: 'Paris', temperature: '10°C' },
    { city: 'New York', temperature: '15°C' },
    { city: 'Tokyo', temperature: '20°C' }
  ];

  return (
    <div className="app">
      <h1>World Weather</h1>
      <div className="weather-grid">
        {cities.map(({ city, temperature }) => (
          <WeatherCard key={city} city={city} temperature={temperature} />
        ))}
      </div>
    </div>
  );
}

export default App;