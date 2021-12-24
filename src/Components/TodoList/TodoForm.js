import React,{useState} from 'react';
import styles from './TodoList.module.scss';

const TodoForm = (props) => {
    const [input, setInput] = useState('')

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
        <form className={styles['todo-form']}  onSubmit={props.edit ? handleUpdateSubmit : handleSubmit}>
        {props.edit ? 
        <>
            <input 
                name="text"
                value={input}
                placeholder={props.todo.text}
                onChange={handleChange}
                autoComplete='off'
                label="Update task"
            />
            <button onClick={handleUpdateSubmit}>
                Update
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
            />
            <button onClick={handleSubmit}>
                Add Task
            </button>
        </>
        }
            
        </form>
    );
};

export default TodoForm;