import React, {useState} from 'react';
import './Todo.css';
import {TransitEnterexit} from "@material-ui/icons";
import TodoList from "./TodoList";


function Todo() {
    const [todos, setTodos] = useState([])
    const [value, setValue] = useState('')

    //Create
    const CreateTodo = (e) =>{
        e.preventDefault();
        console.log('create new todos')
        setTodos([...todos, { id: Math.random()*1000, text:value, isCompleted: false }]);
        setValue('')
    }

    // Complete
    const completeTodo = (id) => {
        const done = todos.map(todo => {
            if (todo.id === id) {
                todo.isCompleted = !todo.isCompleted
            }
            return todo
        })
        setTodos(done)
    };



    // Delete
    const deleteHandler = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    } ;

    return (
        <div className="todo">
            <div className='todo__body'>
                <form
                    className="todo__input__form">
                    <TransitEnterexit/>

                    <input
                        className="todo__input"
                        value={value}
                        onChange={event => setValue(event.target.value)}
                        placeholder="  Set  your  todo . . . . ."
                    />
                    <button
                        disabled={!value}
                        type="submit"
                        onClick={CreateTodo}>submit</button>
                </form>
            </div>

            <div className='todo__todolist'>
                <ul>
                    {todos.map(todo => (
                        <TodoList
                            todo={todo}
                            key={todo.id}
                            completeTodo = {completeTodo}
                            deleteHandlers = {deleteHandler}

                        />
                    ))}
                </ul>
            </div>
        </div>
      )
 }
 export default Todo
