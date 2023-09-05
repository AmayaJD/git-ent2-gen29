import { useEffect, useState } from 'react';
import './App.css'
import WeatherCard from './components/WeatherCard'
import axios from 'axios'

function App() {

  const [coords, setCoords] = useState()
  // primera peticion, para guaradar las cordenadas.
  const [weather, setWeather] = useState()
  // segundo estado, segunda peticion. debemos cololcar el estado coords en
  // el arry de depncias del useEffect para que. 
  const [temp, setTemp] = useState()
  // para guaradar la temperatura en celsius y fahrenheit.
  const [imgClima, setImgClima] = useState()

  const [clima, setClima] = useState()

  useEffect(() => {
    // guardamos todo lo que tenemos abajo dentro del useeffect.
    const sucess = (pos) => {
      // console.log(pos);
      const obj = {
        lat:pos.coords.latitude ,
        lon:pos.coords.longitude
        // buscamos las proiedades para luego guardar en un obj
        // y luego en el Set.
      }
      setCoords(obj);
      // ya tenemos las coodenadas disposibles en la consola.
      }
      //! (primer paso) como haceder a la API de geolocation
      navigator.geolocation.getCurrentPosition(sucess)
  }, [])
  
  // console.log(coords);
  // mostramos la posicion guardada en el estado.

  useEffect(() => {
    if (coords) {
      // este codigo se ejcuta solamnete si coords es distinto de undefined
      const apiKey = "6e5007a3b9664eb032d2e7a89249d38e"
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`
        axios.get (url)
          .then(res =>{  
            setWeather(res.data)
            const obj = {
              celsius: (res.data.main.temp - 273.15).toFixed(1), 
              fahrenheit: ((res.data.main.temp - 273.15) * 9/5 + 32 ).toFixed(1)
            }
          setTemp(obj);
          // guardamos las temperaturas tranformadas.
          })
          .catch(err => console.log(err))
    }
  }, [coords])
  // console.log(weather);
  

  const description = weather?.weather[0].description;
  
  useEffect(() => {
    if (description) {
      setClima(description.replace(" ", "%"))
    }
  }, [description])

  useEffect(() => {
    if (clima) {
      const apiKey = "39164427-0b98aa38000abc3c9a3761e43"
      const url = `https://pixabay.com/api/?key=${apiKey}&q=${clima}`
      axios.get(url)
      .then(response => setImgClima(response.data.hits[0]))
      .catch(err => console.error(err))
      
    }
  }, [clima, ])

  const backgroundStyle = {
    backgroundImage: `url(${imgClima?.webformatURL})`
  }

  return (
    
    <div className="background" style={backgroundStyle}>

        <WeatherCard
          weather={weather}
          temp={temp}/>

    </div>
  )
}

export default App
