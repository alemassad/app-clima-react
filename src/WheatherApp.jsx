import { useState } from "react"
export const WheatherApp = () => {

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = '60f18aee9dab9c4e68608e1f47485005'
    const difKelvin = 273
    const [ciudad, setCiudad] = useState('')
    const [dataClima, setDataClima] = useState(null)

    const handleCambioCiudad = (e) => {
        setCiudad(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (ciudad.length > 0) fetchClima()
    }
    const fetchClima = async () => {
        try {
            const response = await fetch(`${urlBase}?q=${ciudad}&lang=sp&appid=${API_KEY}`)
            const data = await response.json()
            setDataClima(data)
        } catch (error) {
            console.log('Ocurrio el siguente problema: ', error);          
        }
    }

    return (
        <div className="container">
            <h1>Aplicacion del clima</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={ciudad}
                    onChange={handleCambioCiudad} 
                />
                <button type="submit">Buscar</button>
            </form>
            {
                dataClima && (
                    <div>
                        <h2>{dataClima.name}</h2>
                        <p>Temperatura:{ parseInt(dataClima?.main?.temp - difKelvin)}ºC</p>
                        <p>Condicion meteorologica: {dataClima.weather[0].description}</p>
                        <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} alt="imagen del icono"/>

                    </div>
                )
            }

        </div>
    )
}
