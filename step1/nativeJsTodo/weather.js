function onGeo(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    const queryurl = `https://weather-open-api.herokuapp.com/query?lat=${latitude}&lon=${longitude}`;
    fetch(queryurl)
        .then(response => response.json())
        .then(data => {
            const weatherDataList = [data.weather[0].icon, data.name, data.main.temp, ];
            //                       weatherIcon           cityName   currentTemp      
            makeWeatherInfo(weatherDataList);
            setWeatherStyle()
    });
}

function makeWeatherInfo(weatherDataList) {
    upline = document.querySelector('.upline');
    weatherContainer = document.createElement('div');
    weatherContainer.setAttribute('id', 'weatherContainer');
    
    weatherContentList = [document.createElement('img'), document.createElement('span'), document.createElement('span')];
    
    weatherContentList[0].setAttribute('id', 'weatherIcon');
    weatherContentList[0].setAttribute('src', `https://openweathermap.org/img/wn/${weatherDataList[0]}.png`);
    weatherContentList[1].setAttribute('id', 'cityName');
    weatherContentList[1].innerText = weatherDataList[1];
    weatherContentList[2].setAttribute('id', 'currentTemp');
    celsiusSymbol = `&#8451;`
    weatherContentList[2].innerHTML = `${Math.round(weatherDataList[2])}${celsiusSymbol}`;
    

    weatherContentList.forEach(element => {
        weatherContainer.appendChild(element);
    });
    upline.appendChild(weatherContainer);
}

function setWeatherStyle(){
    weCon = document.querySelector('#weatherContainer');
    weCon.style.color = '#ecf0f1';
    weCon.style.textAlign = 'right';
    weIcon = weCon.querySelector('#weatherIcon');
    weIcon.style.width = '30px';
    
}

function geoError() {
    alert('location authority error')
} 

navigator.geolocation.getCurrentPosition(onGeo, geoError);