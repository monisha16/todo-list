import React,{useState} from 'react';
import styles from './TodoList.module.scss';

const TodoForm = (props) => {
    const [input, setInput] = useState('')

    const handleChange = (e) => {
        setInput(e.target.value)
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

    return (
        <form className={styles['todo-form']} onSubmit={handleSubmit}>
            <input 
                name="text"
                value={input}
                placeholder='todo...'
                onChange={handleChange}
                autoComplete='off'
            />
            <button onClick={handleSubmit}>
                Add Task
            </button>
        </form>
    );
};

export default TodoForm;