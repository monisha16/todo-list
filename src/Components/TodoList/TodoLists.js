import React,{useState} from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import styles from './TodoList.module.scss';
import { FiCheckCircle, FiDelete} from "react-icons/fi";

const TodoLists = () => {
    let [toShowTodo, setToShowTodo] = useState('all');
    let [todoList, setTodoList] = useState([]);
    let [toggleAllComplete, settoggleAllComplete] = useState(true);
    let [edit, setEdit] = useState(false)
    let [newTodo, setNewTodo] = useState([])
    let todos = [];

    const addTodo = (todo) =>{
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }
        const newTodos = [todo,...todoList];
        setTodoList(newTodos);
    }

    const deleteTodo = (id) => {
        setTodoList( todoList.filter((todo)=> todo.id !== id))
    }

    const deleteCompletedTodos = () =>{
        setTodoList(todoList.filter((todo)=> !todo.isComplete))
    }

    const updateTodo =(newValue)=>{
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }
        setTodoList(prev => prev.map(item => 
            (item.id === newValue.id ? newValue : item)
            ));
        
        setEdit(false)
    }

    const handleEdit = (todo)=>{
        setNewTodo(todo)
        setEdit(true); 
    }

    const toggleCompleteItem = (id) => {
        let updatedTodos = todoList.map(todo => {
        if (todo.id === id) {
            todo.isComplete = !todo.isComplete;
        }
        return todo;
        });
        setTodoList(updatedTodos);
    }   

    if(toShowTodo === 'all'){
        todos = todoList
    }
    else if(toShowTodo === 'active'){
        todos = todoList.filter((todo)=> !todo.isComplete)
    }
    else if(toShowTodo === 'complete'){
        todos = todoList.filter((todo)=> todo.isComplete)
    }

    return (
        <div className={styles['todo-main-container']}>
            <div className={styles['todo-main-container__title']}> plan your todos </div>

            <div className={styles['todo-form-container']}>
                <div >
                    <TodoForm edit={false} onSubmit={addTodo} /> 
                </div>
                { edit   && 
                    <div className={styles['modal']}> 
                        <div className={styles['modal__header']}>
                            <h1>Update todo</h1>
                            <button className={styles['modal__header__cancel']} onClick={()=>setEdit(false)}
                            > X </button>
                        </div>
                        <TodoForm edit={true} todo={newTodo} onSubmit={updateTodo} />
                    </div>
                }                
             </div>   


            <div className={styles['todo-list-container']}>

                <div className={styles['todo-list-header']}>
                    <FiCheckCircle className={styles['todo-list-header__icon']} 
                        style={{
                           color: toggleAllComplete ? 'white' : 'orangered' 
                        }}
                        onClick={ () => {
                            let newTodo = todoList.map((todo)=>({
                            ...todo,
                            isComplete : toggleAllComplete
                            })) ;
                            setTodoList([...newTodo]);
                            settoggleAllComplete(!toggleAllComplete);
                        }}
                    />
                    <div className={styles['toShow-todo']}>
                        <button className={styles['toShow-todo__button']} onClick={()=>setToShowTodo('all')} >All</button> |
                        <button className={styles['toShow-todo__button']} onClick={()=>setToShowTodo('active')} >Active</button> |
                        <button className={styles['toShow-todo__button']} onClick={()=>setToShowTodo('complete')} >Complete</button>
                    </div>

                    {   todoList.some((todo)=> todo.isComplete) ?
                        <FiDelete className={styles['todo-list-header__icon']} 
                            onClick={deleteCompletedTodos}
                        />  
                        : null 
                    }
                </div>

                <div className={styles['todo-list-content']} >
                    {
                        todos.map((todo,index) =>
                            <Todo key={todo.id} todo={todo} 
                            onDelete={()=>deleteTodo(todo.id)}
                            onEdit ={()=>handleEdit(todo)}
                            toggleComplete={()=>toggleCompleteItem(todo.id)}
                            />
                        )
                    }
                </div>

            </div>

            <div className={styles['todo-footer']}>
                Tasks left todo: {todos.filter((todo)=> !todo.isComplete).length}
            </div>
            
        </div>
    );
};

export default TodoLists;