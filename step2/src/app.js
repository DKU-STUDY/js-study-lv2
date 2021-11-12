const $app = document.querySelector('.app');
const data = ['item0', 'item1', 'item2'];

const injection = () =>{
    let liInner = ''
    data.forEach(ele => liInner = liInner + (`<li>${ele}</li>`));
    $app.innerHTML = `
        <h2>Example #1</h2>
        <ui>
        ${liInner}
        </ui>
        <button>추가</button>
        ` 
    setEvent();
}

const setEvent = () => {
    const appendButton = document.querySelector('button');
    appendButton.addEventListener('click', ()=> {
    data.push(`item${data.length}`);
    console.log(data);
    injection();
});
}


injection();

