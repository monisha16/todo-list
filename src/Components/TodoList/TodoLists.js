import React,{useState} from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import styles from './TodoList.module.scss';

const TodoLists = () => {
    let [toShowTodo, setToShowTodo] = useState('all');
    let [todoList, setTodoList] = useState([]);
    let [toggleAllComplete, settoggleAllComplete] = useState(true);
    const [edit, setEdit] = useState(false)
    let [newTodo, setNewTodo] = useState([])
    
    let todos = [];

    const addTodo = (todo) =>{
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }
        const newTodos = [todo,...todoList];
        setTodoList(newTodos);
    };

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
        console.log("newValue", newValue)
        setTodoList(prev => prev.map(item => 
            (item.id === newValue.id ? newValue : item)
            ));
        
        setEdit(false)
    }

    const handleEdit = (todo)=>{
        console.log("in HANDLEEDIT")
        // setUpdateTodo(prev => prev.map(item => 
        //    ( (item.id === todo.id ? newValue : item), console.log("itemEdit", item))
        // ));
        console.log("handleEdit",todo)
        setNewTodo(todo)
        //  setTodoList(prev => prev.map(item => console.log(item)))
        //  console.log(todoList)
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
        <>
        <div className={styles['todo-main']}>
        <TodoForm edit={false} onSubmit={addTodo} /> 
        { edit   && <TodoForm edit={true} todo={newTodo} onSubmit={updateTodo} />}
             
            <div className={styles['toShow-todo']}>
                <button onClick={()=>setToShowTodo('all')} >All</button>
                <button onClick={()=>setToShowTodo('active')} >Active</button>
                <button onClick={()=>setToShowTodo('complete')} >Complete</button>
            </div>

            <button onClick={ () =>
            
                {let newTodo = todoList.map((todo)=>({
                    ...todo,
                    isComplete : toggleAllComplete
                })) ;
                setTodoList([...newTodo]);
                settoggleAllComplete(!toggleAllComplete);
                console.log("toggleAllComplete: ", toggleAllComplete);}
            }>Complete All</button>

            Tasks left todo: {todos.filter((todo)=> !todo.isComplete).length}
            
            {   todoList.some((todo)=> todo.isComplete) ?
                <button onClick={deleteCompletedTodos}>Delete All</button>
                : null 
            }
            <div className = {styles['todo-rows']}>
                {
                    todos.map((todo,index) =>
                        <Todo key={todo.id} todo={todo} 
                        onDelete={()=>deleteTodo(todo.id)}
                        onEdit ={()=>handleEdit(todo)}
                        toggleComplete={()=>toggleCompleteItem(todo.id)} />
                    )}
            </div>
            
        </div>
    </>
    );
};

export default TodoLists;