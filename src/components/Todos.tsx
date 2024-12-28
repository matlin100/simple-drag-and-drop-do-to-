import React from "react";
import { todo } from "../types";
import SingleTodo from "./singleTodo";
import { Reorder } from "framer-motion";
import "./Todos.scss";

interface ToDosProps {
    todos: todo[];
    setTodos: React.Dispatch<React.SetStateAction<todo[]>>;
}

const ToDos: React.FC<ToDosProps> = ({ todos, setTodos }) => {
    const handleDragEnd = (id: number, newCompletedStatus: boolean) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: newCompletedStatus } : todo
            )
        );
    };

    return (
        <Reorder.Group
            axis="x" // Allow dragging in both x and y directions
            values={todos}
            onReorder={(newOrder) => setTodos(newOrder)}
        >
            <div className="todosContainer">
                <div className="todos-pending todos">
                    <h4>to do</h4>
                    {todos
                        .filter((todo) => !todo.completed)
                        .map((todo) => (
                            <Reorder.Item
                                key={todo.id}
                                value={todo}
                                onDragEnd={() => handleDragEnd(todo.id, true)}
                            >
                                <SingleTodo todo={todo} setTodos={setTodos} todos={todos} />
                            </Reorder.Item>
                        ))}
                </div>

                <div className="todos-completed todos">
                    <h4>completed</h4>
                    {todos
                        .filter((todo) => todo.completed)
                        .map((todo) => (
                            <Reorder.Item
                                key={todo.id}
                                value={todo}
                                onDragEnd={() => handleDragEnd(todo.id, false)}
                            >
                                <SingleTodo todo={todo} setTodos={setTodos} todos={todos} />
                            </Reorder.Item>
                        ))}
                </div>
            </div>
        </Reorder.Group>
    );
};

export default ToDos;
