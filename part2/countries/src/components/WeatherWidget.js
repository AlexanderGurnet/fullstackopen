import { useState, useEffect } from 'react';

import weatherService from '../services/weather';

const WeatherWidget = ({ latlon }) => {
  const [lat, lon] = latlon;

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    weatherService.getWheatherByLatLon(lat, lon).then((weather) => {
      setWeather(weather);
    });
  }, [lat, lon]);

  if (!weather) {
    return <div>Loading...</div>;
  }

  return (
    <article>
      <h2>Weather in {weather?.location?.name}</h2>
      <p>Temperature is {weather?.current?.temp_c} Celcius</p>
      <img src={weather?.current?.condition?.icon} alt={weather?.current?.condition?.text} />
      <p>Wind is {weather?.current?.wind_mph} m/s</p>
    </article>
  );
};

export default WeatherWidget;
