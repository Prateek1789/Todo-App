import { useContext } from "react";
import { TodoContext } from "../context/todoContext";
import Todo from "./Todo"

const TaskContainer = () => {
    const { todos } = useContext(TodoContext);

    return (
        <main className='w-full rounded-lg flex flex-col gap-3'>
            <h2 className='text-2xl text-gray-800'>Today's Tasks</h2>
            <div className='task-container w-full h-full rounded-lg flex flex-col gap-3 overflow-scroll'>
                { todos.map((todo, idx) => <Todo key={idx} task={todo} />) }
            </div>
        </main>
    )
};

export default TaskContainer