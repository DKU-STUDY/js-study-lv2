//import {useState, useEffect} from 'react'
import logo from './logo.svg';
import FocusOfDay from './comp/focusOfDay';
import './App.css';
import TodoList from './comp/toDoList';

function App() {  
  return (
    <div className="App">
      <div className = 'imagecase'>
        <div className='logoimage'>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      </div>
      <FocusOfDay/>
      <TodoList/>
    </div>
  );
}


export default App;
