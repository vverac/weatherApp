import React, { useEffect, useState } from 'react'
import WeatherForm from './WeatherForm.js'
import WeatherMainInfo from './WeatherMainInfo.js';
import Loading from "./Loading.js";

import styles from './weather.module.css'

const Weather = () => {

  const [weather, setWeather] = useState(null);

  console.log({ styles });

  useEffect(() => {
    loadInfo()
  }, [])
  useEffect(() => {
    document.title = "Weather | " + weather?.location?.name ?? "";
  }, [weather]);

  async function loadInfo(city = "london") {
    try {
      const request = await fetch(`${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`)

      const json = await request.json();
      console.log(json)

      setTimeout(() => {
        setWeather({ ...json });
      }, 2000);

    } catch (error) { }
  }

  function handleChangeCity(city) {
    setWeather(null);
    loadInfo(city);
  }

  return (
    <div className={styles.weatherContainer}>
      <WeatherForm onChangeCity={handleChangeCity} />
      {weather ? <WeatherMainInfo weather={weather} /> : <Loading />}
    </div>
  )
}

export default Weather