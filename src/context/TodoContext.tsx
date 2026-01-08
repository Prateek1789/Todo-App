import { createContext, useContext, type ReactNode } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export interface TodoVals {
    id: number;
    date: string;
    title: string;
    status: boolean;
};

export interface TodoValues {
    todos: TodoVals[] | undefined;
    total: number;
    completed: number;
    addTodo: (title: string) => void;
    updateTodo: (id: number, title: string) => void;
    toggleTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
};

interface ProviderProps {
    children: ReactNode;
};

export const TodoContext = createContext<TodoValues | undefined>(undefined);

export const AppProvider = ({ children }: ProviderProps) => {
    const [todos, setTodos] = useLocalStorage<TodoVals[]>([]);
    const total = todos.length;
    const completed = todos.filter(todo => todo.status).length;

    const addTodo = (title: string) => {
        const todo: TodoVals = {
                id: Date.now(),
                title,
                status: false,
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
        <TodoContext value={{ todos, total, completed, addTodo, updateTodo, toggleTodo, deleteTodo }}>
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