import React from "react";
import "./App.scss";
import InputTask from "./components/inputTask";
import ToDos from "./components/Todos";
import { todo } from "./types";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
    const [todo, setTodo] = React.useState<string>("");
    const [todos, setTodos] = React.useState<todo[]>([]);
    const [completedTodos, setCompletedTodos] = React.useState<todo[]>([]);

 

    const handleAdd = () => {
        if (!todo.trim()) return;
        setTodos([...todos, { id: Date.now(), task: todo, completed: false }]);
        setTodo("");
    };

    
    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        // No destination (e.g., dropped outside of a Droppable)
        if (!destination || !source) return;

        // Same droppable list
        if (source.droppableId === destination.droppableId) {
            if (source.droppableId === "pendingTodos") {
                const reorderedTodos = Array.from(todos);
                const [movedItem] = reorderedTodos.splice(source.index, 1);
                reorderedTodos.splice(destination.index, 0, movedItem);
                setTodos(reorderedTodos);
            } else if (source.droppableId === "completedTodos") {
                const reorderedCompletedTodos = Array.from(completedTodos);
                const [movedItem] = reorderedCompletedTodos.splice(source.index, 1);
                reorderedCompletedTodos.splice(destination.index, 0, movedItem);
                setCompletedTodos(reorderedCompletedTodos);
            }
        }

        // Moving between different droppable lists
        if (source.droppableId !== destination.droppableId) {
            if (source.droppableId === "pendingTodos" && destination.droppableId === "completedTodos") {
                const pendingTodos = Array.from(todos);
                const completed = Array.from(completedTodos);
                const [movedItem] = pendingTodos.splice(source.index, 1);
                movedItem.completed = true;
                completed.splice(destination.index, 0, movedItem);
                setTodos(pendingTodos);
                setCompletedTodos(completed);
            } else if (source.droppableId === "completedTodos" && destination.droppableId === "pendingTodos") {
                const pendingTodos = Array.from(todos);
                const completed = Array.from(completedTodos);
                const [movedItem] = completed.splice(source.index, 1);
                movedItem.completed = false;
                pendingTodos.splice(destination.index, 0, movedItem);
                setTodos(pendingTodos);
                setCompletedTodos(completed);
            }
        }
    };

    return (
        <DragDropContext onDragStart={() => { }} onDragEnd={onDragEnd}>
            <div className="App">
                <span className="heading">Task App</span>
                <InputTask todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
                <ToDos
                    todos={todos}
                    setTodos={setTodos}
                    completedTodos={completedTodos}
                    setCompletedTodos={setCompletedTodos}
                />
            </div>
        </DragDropContext>
    );
};

export default App;
