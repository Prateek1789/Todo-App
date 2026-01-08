import { useState, useEffect } from "react";

const STORAGE_KEY = 'todos';

const useLocalStorage = <T>(initialValue: T) => {
    const [todos, setTodos] = useState<T>(() => {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            if (!data) return initialValue;
            return JSON.parse(data);
        }
        catch (err) {
            console.error('Failed to parse local storage data', err);
            return initialValue;
        };
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);

    return [todos, setTodos] as const;
};

export default useLocalStorage