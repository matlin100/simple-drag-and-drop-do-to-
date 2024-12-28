import * as React from 'react';
import './App.scss';
import InputTask from './components/inputTask';
import ToDos from './components/Todos';
import { todo } from './types';
import { DragDropContext } from 'react-beautiful-dnd';


const App: React.FC = () => {   
    const [todo, setTodo] = React.useState<string>(""); 
    const [todos, setTodos] = React.useState<todo[]>([]);
    const [completedTodos, setCompletedTodos] = React.useState<todo[]>([]);

    const handleAdd = () => {
        if(!todo.trim()) return
        setTodos([...todos, {id: Date.now(), task: todo, completed: false}]);
        setTodo(''); 
    }


    return (
        <DragDropContext onDragEnd={() => {}}>
            <div className="App">                
                <span className="heading">task app</span>
                <InputTask  todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
                <ToDos 
                    todos={todos} 
                    setTodos={setTodos} 
                    completedTodos={completedTodos} 
                    setCompletedTodos={setCompletedTodos}/>
            </div>
        </DragDropContext>
    );
}


export default App