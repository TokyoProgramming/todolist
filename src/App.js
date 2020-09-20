import React from 'react';
import './App.css';
import Todo from "./Components/Todo";


function App() {
  return (
    <div className="app">
        <div className='body__card'>
            <h1>My TodoList</h1>
            <div className='body__todo'>
                <Todo />
            </div>
        </div>
    </div>
  );
}

export default App;
