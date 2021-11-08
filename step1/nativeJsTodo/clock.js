    clockContainer = document.querySelector('.js-clock');
    mainDiv = document.querySelector('.main');


function getTime(){
    const date = new Date();
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    clockContainer.innerText = `${hours}:${minutes}`;
}

function setlocation(){
    const widthValue = mainDiv.offsetWidth/2 - clockContainer.offsetWidth/2;
    clockContainer.style.top = `22vh`//`${heightValue}px`;
}

function init(){
    getTime();
    setlocation();
    setInterval(getTime, 500);
}

init();
