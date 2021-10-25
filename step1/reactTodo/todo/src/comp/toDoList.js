import { useEffect, useRef, useState } from 'react'
import './toDoList.css'
const LOCALSTORAGE_LIST_DATA = 'listData'


const TodoList = () => {

    const [listState, setListState] = useState({
            isEdittingNow : false,
            edittingIndex : [],
            listData : [] 
        });

    useEffect(() => {
        const loadLocal = () => {
            const localTemp = JSON.parse(localStorage.getItem(LOCALSTORAGE_LIST_DATA));
            if (localTemp != null){
            setListState({...listState, listData: localTemp, edittingIndex: Array.from({length: localTemp.length},()=>false )});
            console.log('useeff 01');
            }
        }
        loadLocal();
    }, []);

    useEffect(() => {
        localStorage.setItem(LOCALSTORAGE_LIST_DATA ,JSON.stringify(listState.listData));
        console.log(`useEff02 on LocalHost chaged to ${localStorage.getItem(LOCALSTORAGE_LIST_DATA)}`);
        if(listState.edittingIndex.includes(true) && !listState.isEdittingNow){
            setListState(
                {
                    ...listState,
                    isEdittingNow: true
                }
            )
        }
    },[listState])


    const AddToDo = () => {
        const [addToDoInputValue, setAddToDoInputValue] = useState('');

        const handleAddToDoFormSubmit = (e) => {
            e.preventDefault();
            const submittedValue = e.target.childNodes[0].value;
            setListState(
                {
                    ...listState,
                    listData: [...listState.listData, submittedValue],
                    edittingIndex: [listState.edittingIndex, false]
                }
            );
        }

        return(
            <form className = 'addToDoForm' onSubmit={handleAddToDoFormSubmit}>
                <input className='addTodoInput' onChange={(e)=> setAddToDoInputValue(e.target.value)} value={addToDoInputValue}/>
            </form>
        );
    }

    const EditToDo = ({initvalue, indexOfEle}) => {
        const [editOnchangeValue, setEditOnChangeValue] = useState(initvalue);

        const handleOnChange = (e) => {
            setEditOnChangeValue(e.target.value);
        }

        const handleOnSubmit = (e) => {
            e.preventDefault();
            setListState(
                {
                    listData: [...listState.listData.slice(0, indexOfEle), editOnchangeValue, ...listState.listData.slice(indexOfEle + 1)],
                    edittingIndex: [...listState.edittingIndex.slice(0,indexOfEle), false, ...listState.edittingIndex.slice(indexOfEle + 1)]
                }
            );

        }

        return(
            <form className='editToDoForm' onSubmit={handleOnSubmit} >
                <input className='editToDoInput' onChange={handleOnChange} value={editOnchangeValue}/>
            </form>
        );
    }

    if(listState.listData.length === 0){
        return(
            <div className = 'toDoList'>
                <AddToDo/>
            </div>
        );
    }
    if(!listState.isEdittingNow){
        return(
            <div className = 'toDoList'>
                <ul className='listContainer'>
                {listState.listData.map((ele) => {
                    return(
                        <div className='listEle'>
                            <li className = 'toDoLi HighLightOn' onClick={(e)=>{
                                if(e.target.classList.contains('HighLightOn')){
                                    e.target.classList.remove('HighLightOn');
                                    e.target.classList.add('HighLightOff');
                                    return
                                }
                                e.target.classList.remove('HighLightOff');
                                e.target.classList.add('HighLightOn');
                            }}>{ele}</li>
                            <div className='controller'>
                                <div className='edit' onClick={()=> {setListState(
                                    {
                                        ...listState, 
                                        edittingIndex: [...listState.edittingIndex.slice(0,listState.listData.indexOf(ele)), true, ...listState.edittingIndex.slice(listState.listData.indexOf(ele)+1)]}
                                    )}}>
                                    ⋮
                                </div>
                                <div className='del' onClick = {() => {
                                    setListState(
                                        {
                                            ...listState,
                                            listData: [...listState.listData.slice(0,listState.listData.indexOf(ele)), ...listState.listData.slice(listState.listData.indexOf(ele)+1)],
                                            edittingIndex: [...listState.edittingIndex.slice(0, listState.edittingIndex.indexOf(ele)), ...listState.edittingIndex.slice(listState.edittingIndex.indexOf(ele) + 1)]
                                        }
                                    )
                                }}>
                                    ❌
                                </div>
                            </div>
                        </div>
                    );
                })}
                <AddToDo/>
                </ul>
            </div>
        );
    }
    return(
        <div className = 'toDoList'>
            <ui className='listContainer'>
                {listState.listData.map((ele) => {
                        if(listState.edittingIndex[listState.listData.indexOf(ele)]){
                            return(
                                <EditToDo initvalue={ele} indexOfEle= {listState.listData.indexOf(ele)}/>
                            )
                        }
                        return(
                            <div className='listEle'>
                                <li className = 'toDoLi HighLightOn' onClick={(e)=>{
                                if(e.target.classList.contains('HighLightOn')){
                                    e.target.classList.remove('HighLightOn');
                                    e.target.classList.add('HighLightOff');
                                    return
                                }
                                e.target.classList.remove('HighLigtOff');
                                e.target.classList.add('HighLightOn');
                            }}>{ele}</li>
                                <div className='controller'>
                                    <div className='edit' onClick={()=> {setListState(
                                        {
                                            ...listState, 
                                            edittingIndex: [...listState.edittingIndex.slice(0,listState.listData.indexOf(ele)), true, ...listState.edittingIndex.slice(listState.listData.indexOf(ele)+1)]}
                                        )}}>
                                        ⋮
                                    </div>
                                    <div className='del'>
                                        ❌
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                <AddToDo/>
            </ui>
        </div>
    );
}

export default TodoList