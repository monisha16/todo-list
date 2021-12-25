import React,{useState,useRef, useEffect} from 'react';
import styles from './TodoList.module.scss';
import { FiEdit3, FiPlus} from "react-icons/fi";

const TodoForm = (props) => {
    const [input, setInput] = useState('');
    const inputRef = useRef();

    useEffect(()=>{
        inputRef.current.focus()
    },[])
    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: input,
            isComplete: false
        });
        setInput('');
    }

    const handleUpdateSubmit =(e)=>{
        e.preventDefault();
        props.onSubmit({
            id: props.todo.id,
            text: input,
            isComplete: props.todo.isComplete
        });
        setInput('');
    }


    return (
        <form className={styles['todo-form']} onSubmit={props.edit ? handleUpdateSubmit : handleSubmit}>
        {props.edit ? 
        <>
            <input 
                name="text"
                value={input}
                placeholder={props.todo.text}
                onChange={handleChange}
                autoComplete='off'
                className={styles['todo-form__input']}
                ref={inputRef}
            />
        
            <button className={styles['todo-form__button']} onClick={handleUpdateSubmit}>
                <FiEdit3 />
            </button>
        </>
            :
        <>
            <input 
                name="text"
                value={input}
                placeholder='todo...'
                onChange={handleChange}
                autoComplete='off'
                className={styles['todo-form__input']} 
                ref={inputRef}
            />
            <button className={styles['todo-form__button']}  onClick={handleSubmit}>
                <FiPlus/>
            </button>
        </>
        }
            
        </form>
    );
};

export default TodoForm;