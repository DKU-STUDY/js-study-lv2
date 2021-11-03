import components from "../core/Component.js";

export default class Items extends components {
    setup () {
        this.$state = { items: ['item1', 'item2'] };
    }
    template () {
        const { items } = this.$state;
        return`
        <ul>
            ${items.map(item => `<li>${item}</li>`).join('')}
        </ul>
        <button>추가</button>   
        `
    }
    setEvent () {
        this.$target.querySelector('button').addEventListener('click', ()=>{
        const { items } = this.$state;
        this.setState({ items: [ ...items, `item${items.length + 1}`]});
        });
    }
}