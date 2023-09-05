import { useState } from "react"

const WeatherCard = ({ weather, temp }) => {

  const [isCelsius, setIsCelsius] = useState(true)
  
  
  // console.log(clima);
  
  const handleChangeTemp = () => setIsCelsius(!isCelsius)
  

  return (
    <article className='container_princcipal'>
        <h1>Weather App</h1>
        <h2 className="title_country">{weather?.name}, {weather?.sys.country}</h2>

        <div className="containder_card">

            <div className="style_img">
              <img src={weather && `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
              alt="" />
            </div>

            <section className="style_description">
                <h3>"{weather?.weather[0].description}"</h3>
                  <ul className="description__list">
                    <li> <span className="item1">Wind Speed:</span> <span>{weather?.wind.speed} m/s</span> </li>
                    <li> <span className="item1">Clouds:</span> <span>{weather?.clouds.all} %</span> </li>
                    <li> <span className="item1">Pressure:</span> <span>{weather?.main.pressure} hPa</span> </li>
                  </ul>
            </section>

        </div>

            <h2>{isCelsius ? `${temp?.celsius} °C` : `${temp?.fahrenheit} F`}</h2>
            <button onClick={handleChangeTemp} className="style_button">{isCelsius ? 'Change to fahrenheit' :'Change to Celsius'}</button>

    </article>
  )
}

export default WeatherCard