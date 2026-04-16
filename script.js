document.addEventListener('DOMContentLoaded',() =>{
let cityInput=document.getElementById('city-input')
let getWeatherBtn=document.getElementById('get-weather-btn')
let WeatherInfo=document.getElementById('weather-info')
let cityName=document.getElementById('city-name')
let tempDisplay =document.getElementById('temperature')
let feelsLike= document.getElementById("feels_like")
let humidityDisplay= document.getElementById('humidity')
let windDisplay= document.getElementById("wind")
let descriptionDisplay =document.getElementById('description')
let errorMssg =document.getElementById('error-message')

let apiKey= 'f790306bdd87ad43273b362957447800' //env variable

getWeatherBtn.addEventListener('click', async function(){
    let city=cityInput.value.trim()
    if(!city)
        return

    try {
        let weatherData= await  fetchData(city)
        displatData(weatherData)
    } catch (error) {
        ShowError()
    }
})

async function fetchData(city) {
    //  Gets data
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

    let response= await fetch(url)

    console.log(typeof response);
    console.log('RESPONSE', response);
    
    if(!response.ok){
        throw new Error("CITY NOT FOUND");
        
    }

   let data= await response.json()

   return data


}

function displatData(data) {
    console.log(data);

    let {name, main, weather, wind}= data

    cityName.textContent= name

    tempDisplay.textContent= `Temprature : ${main.temp}°C`
    feelsLike.textContent= `Feels Like : ${main.feels_like}°C`
    descriptionDisplay.textContent= `Weather : ${weather[0].main}`
    humidityDisplay.textContent = `Humidity : ${main.humidity}%` 
    windDisplay.textContent = `Wind : ${wind.speed} m/s` 

    // Unlock the display

    WeatherInfo.classList.remove('hidden')
    errorMssg.classList.add('hidden')
}

function ShowError() {
    WeatherInfo.classList.add('hidden')
    errorMssg.classList.remove('hidden')
}

})