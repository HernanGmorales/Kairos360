import sol from '../assets/images/sunny.png';
import nublado from '../assets/images/cloudy.png';
import lluvia from '../assets/images/rainy.png';
import nieve from '../assets/images/snowy.png';
import cargando from '../assets/images/loading.gif'
import clear from '../assets/images/2clear.jpg';
import rain from '../assets/images/1lluvia.jpg';
import thunder from '../assets/images/3thunder.jpg';
import haze from '../assets/images/4haze.jpg';
import mist from '../assets/images/5niebla.jpg';
import clouds from '../assets/images/6clouds.jpg';
import snow from '../assets/images/7Snow-storm.jpeg'

import { useState, useEffect } from 'react';




const WheaterApp = () => {
    const [data, setData] = useState({})
    const [location, setLocation] = useState('')
    const [loading, setLoading] = useState(false)
    const api_key = '9ab8fa7057eec95f3f1fe2463b53ea75'

    useEffect(() => {
        const fetchDefaultWeather = async () => {
            setLoading (true)
            const defaultLocation = "Tunja"
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Metric&APPID=${api_key}`
            const res = await fetch(url)
            const defaultData = await res.json()

            setData(defaultData) 
            setLoading(false)
        }

        fetchDefaultWeather()
    }, [])

    const handleInputChange = (e) => {
        setLocation(e.target.value)
    }

    const search = async () => {
        if(location.trim() !== ""){
            const url = 
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&APPID=${api_key}`
        const res = await fetch(url)
        const searchData = await res.json()
        if(searchData.cod !== 200){
            setData({notFound: true})
        } else {
            setData(searchData) 
        setLocation('')
        }
        setLoading(false)
        }
        
    }

    const handleKeyDown = (e) =>{
        if(e.key === "Enter")
            search()
    }

    const weatherImages = {
        Clear: sol,
        Clouds: nublado,
        Rain: lluvia,
        Shower: lluvia,
        Snow: nieve,
        Sleet: nieve,
        haze: nublado,
        Mist: nublado,
        Drizzle: lluvia,
        Thunderstorm: lluvia
    }

    const weatherImage = data.weather ? weatherImages[data.weather[0].main] : null

    const backgroundImages = {
        Clear: 'linear-gradient(to right, #0b8a3b, #3faeee)',
        Clouds: 'linear-gradient(to right, #d3dde7,  #e0b186, #4d91df)',
        Rain: 'linear-gradient(to right, #f3d483, #e4e5cd, #8ed2ec)',
        Snow: 'linear-gradient(to right, #aff2ff, #fff)',
        Haze: 'linear-gradient(to right, #617075, #dbe4eb)',
        Mist: 'linear-gradient(to right, #617075, #dbe4eb)',
        Drizzle: 'linear-gradient(to right, #5bc8fb, #80eaff)',
        Thunderstorm: 'linear-gradient(to right, #b9c8d3, #d68822)'
    }

    const backgroundImage = data.weather ? backgroundImages [data.weather[0].main] : 'linear-gradient(to right, #f3b07c, #fcd283)'

    const backgroundContainer = {
        Clear: clear,
        Clouds: clouds,
        Rain: rain,
        Snow: snow,
        Haze: haze,
        Mist: mist,
        Drizzle: rain,
        Thunderstorm: thunder
    };
    
    const background = data.weather ? backgroundContainer[data.weather[0].main] : 'linear-gradient(to right, #f3b07c, #fcd283)';


    const currentDate = new Date()

    const daysOfweek = ["Domingo" , "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]

    const months = ["Enero", "Febrero", "Marzo", 
                    "Abril", "Mayo", "Junio", 
                    "Julio", "Agosto", "Septiembre", 
                    "Octubre", "Noviembre", "Diciembre"]

    const dayOfWeek = daysOfweek[currentDate.getDay()]
    const month = months[currentDate.getMonth()] 
    const dayOfMonth = currentDate.getDate()

    const formatteddate = `${dayOfWeek}, ${dayOfMonth} de ${month}`


    return(
        <div className="container" style={{ backgroundImage: `url(${background})` }}>
            <div className="weather-app" style={{backgroundImage : backgroundImage && backgroundImage.replace ? backgroundImage.replace("to right", "to top") : null}}>
            <div className="search">
            <div className="search-top">
                <i className="fa-solid fa-location-dot"> </i>
                <div className="location">{data.name}</div>
            </div>
            <div className="search-bar"> 
                <input type="text"
                placeholder="Ingresa tu ubicación"
                value={location}
                onChange={handleInputChange} 
                onKeyDown={handleKeyDown}
                />
                <i className="fa-solid fa-magnifying-glass" onClick={search}> </i>
            </div>
            </div>
            {loading ? (<img className="loader" src={cargando} alt="cargando" />) : data.notFound ? (<div className="not-found">No encontramos tu ciudad ☹️</div>) : (
                <>
                <div className="weather">
                <img src={weatherImage} alt="sol" />
                <div className="weather-type">{data.weather ? data.weather[0].main : null}</div>
                <div className="temp">{data.main ? `${Math.floor(data.main.temp)}º` : null}</div>
            </div>
            <div className="wheater-date">
                <p>{formatteddate}</p>
            </div>
            <div className="wheater-data">
                <div className="humidity">
                    <div className="data-name">Humedad</div>
                    <i className="fa-solid fa-droplet"></i>
                    <div className="data">{data.main ? data.main.humidity : null}%</div>
                </div>
                <div className="wind">
                    <div className="data-name">Viento</div>
                    <i className="fa-solid fa-wind"></i>
                    <div className="data">{data.wind ? data.wind.speed : null}km/h</div>
                </div>
            </div> </>
            )}
                
            </div>
        </div>
    )
}


export default WheaterApp;