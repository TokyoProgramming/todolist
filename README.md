
#1 React hook を使ってTodoApp を作成したみた。

#2 はじめに 

2020年9月 現在

日本語でReact について検索すると、Class base で書かれた記事はよく見つかるけれど、react hooks を使って書かれた（関数）で書かれた記事が少ないと感じます。<br>
海外サイトを見ていると、Reactの記述をClass baseで書いている人は、2020年9月 現在ほとんどいません。<br>
記事が書かれた時期が2年前だとほとんどClass base ですが、、、（2018年11月 react hooks 発表前 or 直後）<br>
現在は、React Hooksを使って関数で書くことが主流です。(簡潔に書けるから)

なので、これからReactを勉強する　もしくは　勉強し始めの方は、React Hook を使ったアプリ制作を推奨します。<br>

#3 概要

React hooks を　用いて、こんな感じのTodo アプリを作っていきます。
Todo を Create, Complete, Delete します。
・　github link : https://github.com/TokyoProgramming/todolist

![Todolist_new_1](https://user-images.githubusercontent.com/66249668/93712406-a6c4d000-fb90-11ea-8376-233ad9b8f108.gif)


・ディレクトリ構成
```

   +-- backend ...
   |
   |
   |
   +-- frontend
       |   
       +-- src 
            |   
            +-- Components
            |   +-- Todo.js
            |   +-- Todo.css
            |   +-- TodoList.js
            |   +-- TodoList.css
            |
            +-- App.js 
            +-- App.css
            +-- index.js
            +-- index.css
   
```

#4 

メインの``App.js``は以下のようになります。<br>

```App.js  
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
```



```Todo.js

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

        // console.log('create new todos')
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
                            // 他のcomponentには、関数も引き渡すことができます。
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
```


react hooks の中で最もよく使う、　useState.

使用する際は、まず、``import react, {useState} from 'react';`` で``useState``を``import``します。<br>
これを忘れると``'useState' is not defined  no-undef``　のエラー表示がされてしまいます。<br>

``Todo.js``では、
```
    const [todos, setTodos] = useState([])
    const [value, setValue] = useState('')
```
2つの``useState``を定義しました。<br>

(1)``const [todos, setTodos] = useState([])`` では、実際に作成するTodoを配列に格納していくためのものです。<br>

例えば、以下のようにを書き換えるとわかりやすいと思います。
```
const[todos, setTodos] = useState([
    {
        id:1,
        text: "todo1",
        isCompleted: false
    },
    {
        id:2,
        text: "todo2",
        isCompleted: false
    },
])
```
![Todolist_hardcoded](https://user-images.githubusercontent.com/66249668/93713430-ce1e9b80-fb96-11ea-9557-7c3a47612147.gif)


(2)``const [value, setValue] = useState('')``
実際にTodoを作成するフォーム機能のための、useStateです。
公式:https://ja.reactjs.org/docs/hooks-reference.html#usestate
例えば、``const [value, setValue] = useState('Yoooooo')``を記述すると、フォーム欄にあらかじめ、``Yoooooo``と書かれています。




・　Todo 作成
```
//Create
    const CreateTodo = (e) =>{
        e.preventDefault();

        // console.log('create new todos')
        setTodos([...todos, { id: Math.random()*1000, text:value, isCompleted: false }]);
        setValue('')
    }
```

``e.preventDefault()``,``form``を``submit``した際、ページがリフレッシュしません。<br>
``setTodos([...todos, { id: Math.random()*1000, text:value, isCompleted: false }]);``<br>

``...`` これで、配列をコピーします。めちゃめちゃシンプルですよね。<br>
``setTodos([配列をコピー, "追加"])`` <br>
``"追加"``: ``{ id: Math.random()*1000, text:value, isCompleted: false } ``<br>
``id``は、uniqueIdでなければならないので、``uuid``を使用する方法が一般的ですが、``Math.random()`` でランダムな数字を作成します。<br>
残りは、``text:value``, ``isCompleted: false``を設定しておきます。

・　Todo 完了
```
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
```

``map()``関数: https://ja.reactjs.org/docs/lists-and-keys.html#embedding-map-in-jsx <br>
``todo.isCompleted = !todo.isCompleted``選択した ``todo``の``isCompleted``の逆にします。



・　Todo 削除 <br>
   ``filter()``関数を使用します。<br>
```
// Delete
    const deleteHandler = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    } ;
```





#5 TodoList.js

Todoで作成した、``state``と``function (関数)``を 渡していきます。<br>


```
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
                    onClick={() => completeTodo(todo.id)}
                />
                {(todo.isCompleted) ? (
                    <p className="doneTodo">{ todo.text }</p>
                ):(
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

```

