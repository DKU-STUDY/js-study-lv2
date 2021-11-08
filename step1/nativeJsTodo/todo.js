const toDoDiv = document.querySelector(`.to-do-div`);
const toDoUi = document.querySelector(`.to-do-list`);
const LSarrayName = 'toDoList';
const toDoform = document.querySelector('.to-do-input').parentNode;
const toDoInput = document.querySelector('.to-do-input');

function init() {
    localData = loadLocalData();
    drawList(localData);
    askNewToDo();
}

function loadLocalData() {
    temp = JSON.parse(localStorage.getItem(LSarrayName));
    if (temp === null) {
        temp = []
    }
    return temp
}

function drawList(localData) {
    if (localData.length == 0) {
        toDoUi.innerHTML = '';
        return
    }
    if (localData.length < 3 && toDoform.classList.contains('hide')){
        toDoform.classList.toggle('hide');
    }

    if (toDoUi.classList.contains(`hide`) ) {
    toDoUi.classList.toggle(`hide`);
    }
    else{
        toDoUi.innerHTML= '';
    }
    for (dataidx in localData) {

        const newli = document.createElement('li');
        const newform = document.createElement(`form`);
        const newCheck = document.createElement(`input`);
        const newspan = document.createElement(`span`);
        const X = document.createElement(`span`);
        X.classList.add(`Xnum${dataidx}`);
        X.innerHTML = `&#10006;`;
        newform.appendChild(newCheck);
        newform.classList.add(`formNumber${dataidx}`);
        newCheck.setAttribute('type','checkbox');
        if (localData[dataidx][1]) {
            newCheck.setAttribute('checked', '');
        }
        newCheck.classList.add(`checkNumber${dataidx}`);
        newspan.classList.add(`textNumber${dataidx}`);
        const [toDoStr, doOrNot] = localData[dataidx];
        newspan.innerText = toDoStr;
        newli.classList.add(dataidx);
        newli.classList.add('toDoList');
        newli.appendChild(newspan);
        newli.appendChild(newform);
        newli.appendChild(X);
        toDoUi.appendChild(newli);
        setCheckStyle(newform, dataidx);
        setevent(newli,dataidx);
    }
}

function setCheckStyle(checkform, index) {
    const checkbox = checkform.querySelector(`.checkNumber${index}`);
    checkbox.style.margin = '3px';
    checkform.style.position = 'relative';
    checkform.style.top = '-23px';
    offwidth = checkform.parentNode.querySelector(`.textNumber${index}`).offsetWidth;
    checkform.style.left = `${-(20 + offwidth/2)}px`;
    const crossMark = checkform.parentNode.querySelector(`.Xnum${index}`);
    crossMark.style.position = 'relative';
    crossMark.style.top = '-49px';
    crossMark.style.left = `${offwidth/2 + 30}px`;
    checkform.parentNode.style.height = '22px';

    
}

function setevent(liObj, idxNum) {
    checkBoxObj = liObj.querySelector(`.formNumber${idxNum}`).querySelector('input');
    //console.log(checkBoxObj);
    checkBoxObj.addEventListener("click", function(){checkClickHandler(idxNum)});
    XmarkObj = liObj.querySelector(`.Xnum${idxNum}`);
    XmarkObj.addEventListener("click", function(){XclickHandler(idxNum)});
}

function XclickHandler(idxNum) {
    localData = localData.filter((value) => localData.indexOf(value) != idxNum);
    console.log(localData);
    localStorage.setItem(LSarrayName, JSON.stringify(localData));
    init();
}

function checkClickHandler(idxNum){
    checkObj = toDoUi.querySelector(`.formNumber${idxNum}`).querySelector('input');
    console.log(checkObj); // 확인용
    if(localData[idxNum][1] !== checkObj.checked)
    {
        localData[idxNum][1] = checkObj.checked
        localStorage.setItem(LSarrayName, JSON.stringify(localData));
    }
}


function askNewToDo(){;
    if (localData.length >= 3) {
        toDoform.classList.add('hide');
    } 
    toDoform.addEventListener("submit", handleNewInput);
}

function handleNewInput(event){
    event.preventDefault();
    const newToDo = toDoInput.value;
    console.log(newToDo);
    console.log(localData);
    localData.push([newToDo, false]);
    localStorage.setItem(LSarrayName, JSON.stringify(localData));
    toDoInput.value = null;
    init();
}

init()