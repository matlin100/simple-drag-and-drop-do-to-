import React, { useEffect, useRef, useState } from "react";
import { todo } from "../types";
import { MdEdit, MdDelete } from "react-icons/md";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { IoMdSave } from "react-icons/io";
import "./singleTodo.scss";

interface SingleTodoProps {
    todo: todo;
    todos: todo[];
    setTodos: React.Dispatch<React.SetStateAction<todo[]>>;
}


const SingleTodo: React.FC<SingleTodoProps> = ({ todo, todos, setTodos }) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editValue, setEditValue] = useState<string>(todo.task);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (editMode) {
            inputRef.current?.focus();
        }
    }, [editMode]);

    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleDone = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const handleSave = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, task: editValue } : todo
            )
        );
        setEditMode(false);
    };

    return (
        <div className="singleTodoContainer">
            {editMode ? (
                <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    ref={inputRef}
                    className="editInput"
                />
            ) : (
                <span className={todo.completed ? "task completed" : "task"}>
                    {todo.task}
                </span>
            )}
            <div className="iconContainer">
                {editMode ? (
                    <IoMdSave
                        className="editIcon icon"
                        onClick={() => handleSave(todo.id)}
                    />
                ) : (
                    <MdEdit
                        className="editIcon icon"
                        onClick={() => setEditMode(true)}
                    />
                )}
                <IoCheckmarkDoneCircleSharp
                    className="doneIcon icon"
                    onClick={() => handleDone(todo.id)}
                />
                <MdDelete
                    className="deleteIcon icon"
                    onClick={() => handleDelete(todo.id)}
                />
            </div>
        </div>
    );
};

export default SingleTodo;
