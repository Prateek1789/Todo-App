import { useState, useEffect, createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const HeaderContext = createContext();
export const TodoContext = createContext();
export const FormContext = createContext();

export const AppProvider = ({ children }) => {
    const [todos, setTodos] = useLocalStorage();
    const totalTodos = todos.length;
    const completedTodos = todos.filter(todo => todo.isCompleted === true).length;
    const [formState, setFormState] = useState(false);
    const [isEditing, setEditing] = useState(false);

    const createTodo = (title, summary, priority) => {
        if (title && summary) {
            return {
                id: Date.now(),
                title,
                summary,
                priority: priority,
                isCompleted: false,
                date: new Date().toLocaleDateString()
            };
        }
    }

    const closeTodoForm = (titleInput, summaryInput) => {
        titleInput.current.value = '';
        summaryInput.current.value = '';
        setFormState(!formState);
    }

    const addTodo = (title, summary, priority) => {
        const data = createTodo(title, summary, priority);
        setTodos(prev => [data, ...prev]);
    }

    const checkTodo = (id) => {
        setTodos(prev => prev.map(todo => todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo));
    }

    const editTodo = (id) => {
        setEditing(true);
        setFormState(true);
    }

    return (
        <HeaderContext.Provider value={{ totalTodos, completedTodos }}>
            <TodoContext.Provider value={{ todos, checkTodo, editTodo }}>
                <FormContext.Provider value={{ isEditing, formState, setFormState, addTodo, closeTodoForm }}>
                    { children }
                </FormContext.Provider>
            </TodoContext.Provider>
        </HeaderContext.Provider>
    )
}