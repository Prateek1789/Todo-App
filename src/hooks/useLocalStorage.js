import { useState, useEffect } from "react";

const STORAGE_KEY = 'todos';

function saveData(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function getSavedData() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

const useLocalStorage = (todo) => {
    const [todos, setTodos] = useState(getSavedData());

    useEffect(() => {
        saveData(todos);
    }, [todos]);

    return [todos, setTodos];
}

export default useLocalStorage;