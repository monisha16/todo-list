import React from 'react';
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
        onClick={props.onEdit}
        > Edit </button>
        <button className={styles['todo-delete']}
        onClick={props.onDelete}
        > X </button>
        </div>
    )
};

export default Todo;