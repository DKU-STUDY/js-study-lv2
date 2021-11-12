const $app = document.querySelector('.app');
const state = {
    table: ['item0', 'item1', 'item2']
}

const render = () => {
    const listTable = state.table;
    $app.innerHTML = `
    <h3>Example #1</h3>
    <ul>
    ${listTable.map(item => `<li>${item}</li>`).join('')}
    </ul>
    <button>추가</button>
    `
    document.querySelector('button').addEventListener('click', () => {
       setTable(`item${listTable.length}`); 
    });
}

const setTable = (input) => {
    state.table.push(input);
    render();
}

render();