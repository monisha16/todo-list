import React from 'react';
import styles from './TodoList.module.scss';
import { FiEdit3, FiCheckCircle, FiDelete} from "react-icons/fi";

const Todo = (props) => {

    return (
        <div className={styles['todo-row']}>
            <FiCheckCircle className={styles['todo-row-left']} 
             style={{
                    color: props.todo.isComplete ? 'orangered' :'white' 
                }}
            onClick={props.toggleComplete}
            />

            <div  className={styles['todo-row-text']}
                style={{
                    textDecoration: props.todo.isComplete ?  'line-through' : ""
                }}
            >
                {props.todo.text} 
            </div>
            <div className={styles['todo-row-right']}>
                <FiEdit3 className={styles['todo-row-right__button']} onClick={props.onEdit}/>
                <FiDelete className={styles['todo-row-right__button']} onClick={props.onDelete}/>
            </div>
            
        </div>
    )
};

export default Todo;