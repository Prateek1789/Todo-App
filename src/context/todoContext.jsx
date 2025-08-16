import { useState, useEffect, createContext } from "react";

export const HeaderContext = createContext();
export const TodoContext = createContext();
export const FormContext = createContext();

export const AppProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const totalTodos = todos.length;
    const completedTodos = todos.filter(todo => todo.isCompleted === true).length;
    const [formState, setFormState] = useState(false);
    const isEditing = false;

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

    return (
        <HeaderContext.Provider value={{ totalTodos, completedTodos }}>
            <TodoContext.Provider value={{ todos, checkTodo }}>
                <FormContext.Provider value={{ isEditing, formState, setFormState, addTodo, closeTodoForm }}>
                    { children }
                </FormContext.Provider>
            </TodoContext.Provider>
        </HeaderContext.Provider>
    )
}