import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

const API_KEY = 'd8446d7ae14f64dc12e6327f5c4ea78f';

function WeatherPage() {
  const [data, setData] = useState({});
  const [isError, setIsError] = useState(false);
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      setIsError(false);
      axios.get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          setIsError(true);
          console.log(error);
        })
        .finally(() => {});
      setLocation('');
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder='Wyszukaj lokalizacje'
          type="text" />
      </div>

      {isError ? <h1 className='notfound'>Nie znaleziono ( ´•︵•` )</h1> :
        <div className="container">
          <div className="top">
            <div className="location">
              <p className='miasto'>{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>

          {data.name !== undefined &&
            <div className="bottom">
              <div className="feels">
                {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
                <p>Odczuwalna temperatura</p>
              </div>
              <div className="humidity">
                {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                <p>Wilgotność</p>
              </div>
              <div className="wind">
                {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} M/s</p> : null}
                <p>Prędkość powietrza</p>
              </div>
            </div>
          }
        </div>
      }
      <button><div className="link">
        <Link to="/SecondPage">Prognoza na przyszłość</Link>
      </div></button>
    </div>
  );
}

function SecondPage() {
  return (
    <div className="SecondPage">
      <h1>Prognoza na kolejne dni</h1>
      <p>Tutaj pojawią się prognozy na przyszłość.</p>
      <Link to="/">Wróć do strony głównej</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeatherPage />} />
        <Route path="/SecondPage" element={<SecondPage />} />
      </Routes>
    </Router>
  );
}

export default App;
