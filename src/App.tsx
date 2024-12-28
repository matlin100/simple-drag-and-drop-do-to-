import * as React from 'react';
import './App.scss';
import InputTask from './components/inputTask';
import ToDos from './components/Todos';
import { todo } from './types';


const App: React.FC = () => {   
    const [todo, setTodo] = React.useState<string>(""); 
    const [todos, setTodos] = React.useState<todo[]>([]);

    const handleAdd = () => {
        if(!todo.trim()) return
        setTodos([...todos, {id: Date.now(), task: todo, completed: false}]);
        setTodo(''); 
    }


    return (
        <div className="App">                
            <span className="heading">task app</span>
            <InputTask  todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
            <ToDos todos={todos} setTodos={setTodos}/>
        </div>
    );
}


export default App