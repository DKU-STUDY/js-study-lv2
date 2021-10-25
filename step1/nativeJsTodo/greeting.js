const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings"),
    date = new Date(),
    hours = date.getHours();

const USER_LS = "currentUser",
      HIDE_CN = 'hide';

function init() {
    loadName();
}
    
function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser == null) {
        if (form.classList.contains(HIDE_CN)){
            form.classList.toggle(HIDE_CN);
        }
        askForName();
    }
    else {
        paintGreeting(currentUser);
    }
} 

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    localStorage.currentUser = currentValue;
    input.value = null;
    console.log(currentValue);
    paintGreeting(currentValue);
}

function askForName(){
    form.addEventListener("submit", handleSubmit);

}

function paintGreeting(text) {
    if (!form.classList.contains(HIDE_CN)){
        form.classList.toggle(HIDE_CN);
    }
    if (greeting.classList.contains(HIDE_CN)){
        greeting.classList.toggle(HIDE_CN);
    }
    if (hours < 12) { 
        greeting.innerHTML = `Good morning, ${text}<span id='greetXmark'>&#10006;</span>`;
    }
    else if (hours < 18) {
        greeting.innerHTML = `Good afternoon, ${text}<span id='greetXmark'>&#10006;</span>`;
    }
    else{
        greeting.innerHTML = `Good evening, ${text}<span id='greetXmark'>&#10006;</span>`;
    }
    xmark = greeting.querySelector('#greetXmark')
    xmark.addEventListener("click", handleClick);

    formAndGreetDiv = document.querySelector('.form-and-nametxt');
    formAndGreetDiv.addEventListener("mouseover", popup)
    formAndGreetDiv.addEventListener("mouseout", popoff)
}

function popup(){
    console.log('mousein')
    xmark.style.visibility = 'visible';
    xmark.classList.remove('popoff');
    xmark.classList.add('popup');
}

function popoff(){
    console.log('mouseout')
    xmark.classList.remove('popup');
    xmark.classList.add('popoff')
    xmark.style.visibility = 'hidden';
}

function handleClick(){
    if (localStorage.getItem(`currentUser`) === null) {
        return
    }
    console.log('remove')
    greeting.innerHTML = '';
    localStorage.removeItem("currentUser");
    if(!greeting.classList.contains(HIDE_CN)) {
        form.classList.toggle(HIDE_CN);
    }
    init();
}


init();

