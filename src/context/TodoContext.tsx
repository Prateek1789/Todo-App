import { useState, createContext, useContext, type ReactNode } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export type Priority = 'low' | 'medium' | 'high';

export interface TodoVals {
    id: number;
    date: string;
    title: string;
    status: boolean;
    priority: Priority;
};

export interface ContextValues {
    todos: TodoVals[] | undefined;
    sortedTodos: TodoVals[];
    total: number;
    completed: number;
    priority: Priority;
    addTodo: (title: string, level: Priority) => void;
    cyclePriority: () => void;
    updateTodo: (id: number, title: string) => void;
    toggleTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
};

interface ProviderProps {
    children: ReactNode;
};

export const TodoContext = createContext<ContextValues | undefined>(undefined);

export const AppProvider = ({ children }: ProviderProps) => {
    const [todos, setTodos] = useLocalStorage<TodoVals[]>([]);
    const total = todos.length;
    const completed = todos.filter(todo => todo.status).length;
    const [priority, setPriority] = useState<Priority>('low');

    const sortedTodos: TodoVals[] = todos.sort((a, b) => {
        if (a.status !== b.status) return a.status ? 1 : -1;

        const priorityWeight = { low: 1, medium: 2, high: 3 };
        const pDiff = priorityWeight[b.priority] - priorityWeight[a.priority];
        if (pDiff !== 0) return pDiff;

        return a.id - b.id;
    });

    const cyclePriority = () => {
        switch(priority) {
            case 'low': setPriority('medium');
                break;
            case 'medium': setPriority('high');
                break;
            case 'high': setPriority('low');
        };
    };

    const addTodo = (title: string, level: Priority) => {
        const todo: TodoVals = {
                id: Date.now(),
                title,
                status: false,
                priority: level,
                date: new Date().toLocaleDateString()
        };
        setTodos(prev => [todo, ...prev]);
    };

    const updateTodo = (id: number, title: string) => {
        setTodos(prev => prev.map(todo => todo.id === id ? { ...todo, title } : todo));
    };

    const toggleTodo = (id: number) => {
        setTodos(prev => prev.map(todo => todo.id === id ? {...todo, status: !todo.status } : todo));
    };

    const deleteTodo = (id: number) => setTodos(prev => prev.filter(todo => todo.id !== id));

    return (
        <TodoContext value={{ 
            todos, 
            sortedTodos, 
            total, 
            completed, 
            priority, 
            cyclePriority, 
            addTodo, 
            updateTodo, 
            toggleTodo, 
            deleteTodo 
        }}>
            { children }
        </TodoContext>
    )
};

export const useTodo = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error("useTodo must be used within TodoProvider");
    }
    return context;
};