import {useState, useEffect, useRef} from 'react'
import './focusOfDay.css';
const LOCALSTORAGE_TODAY_FOCUS = 'todayFocus'

const FocusOfDay = () => {
    const[todayFocus, todayFocusSetter] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const editter = useRef();
    
    const getTodayFocus = (FocusSetter) => {
        let storagedFocus = localStorage.getItem(LOCALSTORAGE_TODAY_FOCUS);
        FocusSetter(storagedFocus);
    }
    
    const setTodayFocus = (FocusSetter, inputvalue) => {
        localStorage.setItem(LOCALSTORAGE_TODAY_FOCUS, inputvalue);
        FocusSetter(inputvalue);
        return
    }
    
    useEffect(() => {
        getTodayFocus(todayFocusSetter);
    },[])
    
    if (todayFocus === null){
    
        const onChange = (e) => {
        setInputValue(e.target.value);
        }
    
        const onSubmit = (e) => {
        e.preventDefault();
        setTodayFocus(todayFocusSetter, inputValue);
        }
    
        return(
        <div className='todayFocusView'>
            <form onSubmit= {onSubmit}>
            <input className='todayFocusInput' placeholder='Today Focus' value = {inputValue} onChange = {onChange}  type='text'/>
            </form>
        </div>
        );
    } 
    
    const pOnClick = (e) => {
        const classList = e.target.classList;
        classList.forEach(element => {
        if (element === 'HighLighted'){
            e.target.classList.remove('HighLighted');
            e.target.classList.add('HighLigtedOff');
        }
        if (element === 'HighLigtedOff'){
            e.target.classList.remove('HighLigtedOff');
            e.target.classList.add('HighLighted');
        }
        console.log(element);
        });
    }

    const mouseIn = (e) => {
        editter.current.classList.remove('popout');
        editter.current.classList.add('popin');
    }

    const mouseout = (e) => {
        editter.current.classList.remove('popin');
        editter.current.classList.add('popout');
    }

    const removeTodayFocus = () => {
        setInputValue(null);
        todayFocusSetter(null);
        localStorage.removeItem(LOCALSTORAGE_TODAY_FOCUS);
    }

    return(
        <div className='todayFocusView' onMouseOver={mouseIn} onMouseOut= {mouseout}>
            <p className='todayFocusP HighLighted' onClick={pOnClick}>{todayFocus}</p>
            <div className='todayFocusSetter popout' ref={editter}>
                <p className='xmark' onClick={removeTodayFocus}>❌</p>
            </div>
        </div>
    )   

}


export default FocusOfDay