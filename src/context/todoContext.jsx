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
    const [editingTodo, setEditingTodo] = useState();

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

    const handleFormState = () => {
        setFormState(!formState);
        if (isEditing) setEditing(false);
    }

    const addTodo = (title, summary, priority) => {
        const data = createTodo(title, summary, priority);
        setTodos(prev => [data, ...prev]);
        handleFormState();
    }

    const checkTodo = (id) => {
        setTodos(prev => prev.map(todo => todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo));
    }

    const handleEdit = (id) => {
        const data = todos.find(todo => todo.id === id);
        setEditingTodo(data);
        setEditing(true);
        setFormState(true);
    }

    const updateTodo = (newTitle, newSummary, newPriority) => {
        const id = editingTodo.id;
        setTodos(prev => prev.map(todo => todo.id === id ? {...todo, title: newTitle, summary: newSummary, priority: newPriority} : todo));
        handleFormState();
    }

    const deleteTodo = (id) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    }

    return (
        <HeaderContext.Provider value={{ totalTodos, completedTodos }}>
            <TodoContext.Provider value={{ todos, checkTodo, handleEdit, deleteTodo }}>
                <FormContext.Provider value={{ formState, setFormState, isEditing, editingTodo, addTodo, handleFormState, updateTodo }}>
                    { children }
                </FormContext.Provider>
            </TodoContext.Provider>
        </HeaderContext.Provider>
    )
}