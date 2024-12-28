import React from "react";
import { todo } from "../types";
import SingleTodo from "./singleTodo";
import { Droppable } from "react-beautiful-dnd";
import "./Todos.scss";

interface ToDosProps {
    todos: todo[];
    completedTodos: todo[];
    setTodos: React.Dispatch<React.SetStateAction<todo[]>>;
    setCompletedTodos: React.Dispatch<React.SetStateAction<todo[]>>;
}

const ToDos: React.FC<ToDosProps> = ({todos,  setTodos, completedTodos,  setCompletedTodos,}) => {

    return (
        <div className="todosContainer">
            <Droppable droppableId="pendingTodos">
                {(provided) => (
                    <div
                        className="todos-pending todos"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <h4>To Do</h4>
                        {todos.map((todo, index) => (
                            <SingleTodo
                                key={todo.id}
                                todo={todo}
                                todos={todos}
                                setTodos={setTodos}
                                index={index} 
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            {/* Completed Todos */}
            <Droppable droppableId="completedTodos">
                {(provided) => (
                    <div
                        className="todos-completed todos"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <h4>Completed</h4>
                        {completedTodos.map((todo, index) => (
                            <SingleTodo
                                key={todo.id}
                                todo={todo}
                                todos={completedTodos} 
                                setTodos={setCompletedTodos} 
                                index={index} 
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default ToDos;
