import React, {useState} from 'react';
import './TodoList.css';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DoneIcon from '@material-ui/icons/Done';
import {Edit} from "@material-ui/icons";

function TodoList( {todo, completeTodo, deleteHandlers, updateHandler } ) {



    return (
        <div className="todoList">
            <div
                className='todolist__card'
                style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
            >
                <DoneIcon
                    // onClick={() => completeTodo(index)}
                    onClick={() => completeTodo(todo.id)}
                />
                {(todo.isCompleted) ? (
                    <p className="doneTodo">{ todo.text }</p>
                ): (
                    <p>{ todo.text}</p>

                )}

                <DeleteForeverIcon
                    onClick={() => deleteHandlers(todo.id)}
                />
            </div>
        </div>
      )
 }

 export default TodoList
