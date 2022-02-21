그냥 따라만 치니까 배우는게 없는거 같아서,

완성된 페이지를 보고 역으로 코드를 짜보고 => 원 글의 코드보다 어떤게 부족했는지 피드백하는 방식으로 진행하는중 입니다.

<h2> Exam 01</h2>

<img src='.\reviewImages\Example#1.png' height='200px'/>

결과를 보고 든 생각.

1. 모든 DOM 요소들은, js파일로 동적으로 생성된 요소들이다.

2. 리스트 태이블에 들어가는 정보를 변수로 저장하고, 버튼의 OnClick 이벤트로 변수에 마지막 요소를 동적으로 추가한다.

그리고 나온 누더기...

* index.html

```html
<!DOCTYPE html>
<html>
    <head><meta charset="UTF-8"/>
    <title>Simple Compotnet</title>
</head>
<body>
    <div class="app"></div>
    <script src="./src/app.js" type="module"></script>
</body>

</html>
```

* app.js

```js
const $app = document.querySelector('.app');
const data = ['item0', 'item1', 'item2'];

const injection = () =>{
    let liInner = ''
    data.forEach(
        ele => liInner = liInner + (`<li>${ele}</li>`)
                );
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
```


<h4>문제점</h4>

app.js line 2

* 리스트에 들어가는 정보를 data라는 배열로 생성하는건, 앞으로 사이트의 기능이 추가될시에 확장성이 없다. 모든 정보를 관할하는 객체를 먼저 선언하고 그 안에 리스트의 데이터를 넣는게 좀더 좋을것.

```js
//=> 수정 전
const data = ['item0', 'item1', 'item2']; // data라는 이름도 너무 모호하다. ul 태그에 사용될 데이터라는걸 잘 알수 있는 이름으로 작성하자.
//=> 수정 후
const state = {
    table: ['item0', 'item1', 'item2']
}
```

app.js line 6~9

* map method로도 string을 반환시킬수 있다는점 을 알지 못했다.<br/>map을 사용하면 의미없는 placeHolder인 liInner변수를 선언할 필요가 없어짐.

```js
//=> 수정 전
let liInner = ''
    data.forEach(
        ele => liInner = liInner + (`<li>${ele}</li>`)
                );
$app.innerHTML = `
        <생략/>
        ${liInner}
        <생략/>
 `
//=>수정 후
$app.innerHTML = `
	<생략/>
	${state.table.map(ele => `<li>${ele}</li>`).join('')}
	<생략/>
`
```

* state의 setter와, render func 두개로 재구성하는게 더 직관적이다.<br/>setEvent와 injection은 하나로 묶여 render로 변경되어야 할 것.

```js
//수정 전

const injection = () => {
    // ....
    setEvent();
}

const seEvent = () => {
    //...
    injection();
}
// 사실 왜 무한루프가 안나는지 잘 모르겠다.

//수정 후
const $app = document.querySelector('.app');
const state = {
    table: ['item0', 'item1', 'item2']
}

const render = () => {
    const listTable = state.table;
    $app.innerHTML = `
    <h3>Example #1</h3>
    <ul>
    ${listTable.map(item => `<li>${item}</li>`.join(''))}
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
```



<h2>Example #2</h2>

Ex #1 의 코드를 class를 사용해 구성해보자.

class의 작성과 사용에 익숙하지 않아서 엄청 해매버렸다.

* component.js

```js
class Component {
    constructor(newStat){
        this.setState(newStat);
        this.render();
    }
    $app = document.querySelector('.app');
    state
    setState(newState){
        this.state = {...this.state, ...newState}
        this.render();
    }

    render(){}

}

export default Component;
```

* app.js

```js
import Component from "./component.js";

class App extends Component{
    render(){
        const table = this.state.item;
        this.$app.innerHTML=`
        <h3>Example #2</h3>
        <ul>
        ${table.map(ele => `<li>${ele}</li>`).join('')}
        </ul>
        <button>추가</button>
        `
        document.querySelector('button').addEventListener('click', () => {
            this.setState({item : [...this.state.item, `item${this.state.item.length}`]});
            this.render();
        });
    
    }
    
}

new App({item: ['item0', 'item1', 'item2']});
```

몰랐던 점들.

* constructorr 함수는 상속받은 클래스가 아닌 부모 클래스에서 작성해야 깔끔해짐.

* setState함수로 state를 깔끔하게 갱신하기 쉽지 않구나.

수정해야할 점

* 확장성을 고려해, event binding 하는 메소드를 하나 추가하자.
* state 초기값을 initialize 하는 메소드를 사용하자.
* component의 부모는 꼭 app div가 아닐 수 있기 때문에, constructor에 target을 받도록 하자.



<h1>Example#4</h1>



<img src = './reviewimages/Example#4.png' height ='200px'/>

* list라는 ul 태그를 관장하는 component 밑에 각각의 li 태그를 관장하는 item이라는 component를 생성해 관리하고 싶다.
  * 문제점들.
    - render()에서 하위 component를 선언해야할까?
    - 새 클래스를 선언하더라도 클래스 자체의 리턴값을 만들 수 없고 추가적으로 스트링을 반환하는 메소드를 작성해야하나?



결과

* component.js

```js
class Component {
    target
    constructor(target){
        if (arguments.length > 1){
            this.props = arguments[1][0];
            this.updateData = arguments[1][1];
            this.updateRender = arguments[1][2];
        }
        this.target = target;
        this.stateInit(); 
        this.render();
    }
    state
    props
    updateData
    setState(newState){
        this.state = newState;
        this.render();
    }
    content(){return ''}
    stateInit(){}
    setEvent(){}
    render(){
        this.target.innerHTML = `${this.content()}`;
        this.setEvent();
    }
    
}

export default Component;
```

* list.js

```js
import Component from "../core/component.js";
import Item from "./item.js";

class List extends Component{
    constructor(target){
        super(target);
        
    }
    stateInit(){
        console.log('constructList');
        this.state = {
            item : [{key : 0, item: 'item0'}, {key: 1, item: 'item1'}, {key: 2, item: 'item2'}]
        }
    }
    content(){
        return `
        <h2>Ex#04</h2>
        <ul class='list'></ul>
        <button class='append'>추가</button>
        `
    }
    render(){
        console.log('list Rendered');
        this.target.innerHTML = this.content();
        const $list = this.target.querySelector('.list');
        new Item($list, [this.state, this.setState.bind(this)]);
        this.setEvent();
    }
    setEvent(){
        const targetObj = this.target.querySelector('.append');
        targetObj.addEventListener('click', () => {
            console.log(this.state);
            console.log([...this.state.item, {key: this.state.item.length, item: `item${this.state.item.length}`}]);
            this.setState({item : [...this.state.item, {key: this.state.item.length, item: `item${this.state.item.length}`}]});
            //this.render();
            
        })
    }
    setState(newState){
        console.log('newState');
        this.state = newState;
        this.render.apply(this);
    }
}

export default List
```

* item.js

```js
import Component from "../core/component.js";

class Item extends Component{

    content(){
        console.log('props', this.props);
        return this.props.item.map(ele => `
        <li>${ele.item}<button class = ${ele.key}>삭제</button></li>
        `).join('');
    }

    render(){
        this.target.innerHTML = this.content();
        this.setEvent();
    }

    setEvent(){
        const buttons = this.target.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click' , ()=> {
                console.log(button.classList[0]);
                let newstate = {item : this.props.item.filter(ele => ele.key != button.classList[0])}
                this.props = newstate;
                this.updateData(newstate);
                //this.render();
            });
            });
    }
}


export default Item
```

