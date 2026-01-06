import Todo from "./Todo";
import { type TodoShape } from "../types/types";

interface TaskAreaProps {};

const TaskArea = ({}: TaskAreaProps) => {

    const todoItems: TodoShape[] = [  // Test data
        {
            id: 131,
            title: "Fix app",
            date: "05-01-26",
            priority: "high",
            status: false
        },
        {
            id: 132,
            title: "Make another App",
            date: "05-01-26",
            priority: "medium",
            status: false
        },
        {
            id: 133,
            title: "Practice the shit out of it",
            date: "05-01-26",
            priority: "low",
            status: false
        },
    ];

    const totalTodos = todoItems.length; // test data

    return (
        <div className={`w-full h-full rounded-lg border border-neutral-200 grid grid-rows-[repeat(${totalTodos},3.5rem)] content-start gap-3`}>
            { todoItems.map(itm => <Todo key={itm.id} 
                                         id={itm.id} 
                                         title={itm.title} 
                                         date={itm.date} 
                                         priority={itm.priority} 
                                         status={itm.status} /> )}
        </div>
    )
};

export default TaskArea