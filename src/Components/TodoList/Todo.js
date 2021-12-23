import React,{useState} from 'react';
import TodoForm from './TodoForm';
import styles from './TodoList.module.scss';

const Todo = (props) => {
    return (
        <div className={styles['todo-row']}>
        <div 
            onClick={props.toggleComplete}
            style={{
                textDecoration: props.todo.isComplete ?  'line-through' : ""
            }}
        >
            {props.todo.text} 
        </div>
        <button className={styles['todo-delete']}
        onClick={props.onDelete}
        > X </button>
        </div>
    )
};

export default Todo;