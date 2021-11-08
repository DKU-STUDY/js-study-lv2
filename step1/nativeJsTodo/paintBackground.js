const imageNumber = Math.floor(Math.random() * 7) + 1
const imagePath = `backgroundPicture/image0${imageNumber}.jpg`
const docBody = document.querySelector('body');

function init(){
    docBody.style.backgroundImage = `url(${imagePath})`;
    docBody.style.backgroundSize = 'cover';
    docBody.style.backgroundRepeat = 'no-repeat';
    docBody.style.height = '100vh';
}

init();