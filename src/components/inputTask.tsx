import React from 'react';
import './inputSearch.scss';


interface InputTaskProps {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: () => void;
}

const InputTask: React.FC<InputTaskProps> = ({todo, setTodo, handleAdd }) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    return (
        <form
            className="inputSearchContainer"
            onSubmit={(e) => {
                e.preventDefault(); 
                handleAdd();
                // inputRef.current?.focus(); 
            }}
        >
            <input

                type="text"
                placeholder="Search for a task"
                className="inputSearch"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                ref={inputRef}
            />
            <button className="searchButton" type="submit">
                Search
            </button>
        </form>
    );
};

export default InputTask;
