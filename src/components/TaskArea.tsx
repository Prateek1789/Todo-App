import Todo from "./Todo";
import { useTodo } from "../context/TodoContext";
import { CircleCheck } from "lucide-react";

interface TaskAreaProps {};

const TaskArea = ({}: TaskAreaProps) => {
    const { sortedTodos, total } = useTodo();

    return (
        <div className={`w-full h-full px-4 relative rounded-2xl grid content-start gap-3 overflow-y-scroll`}
             style={{ gridTemplateRows: `repeat(${total},4.25rem)` }}>
            { sortedTodos?.map(itm => <Todo key={itm.id} 
                                      id={itm.id} 
                                      title={itm.title} 
                                      date={itm.date} 
                                      status={itm.status}
                                      priority={itm.priority} /> )}
            <div className={`w-full h-50 border border-blue-400 border-dashed rounded-2xl ${!total ? 'flex' : 'hidden'} flex-col justify-center gap-4 items-center`}>
                <CircleCheck size={50} color="oklch(70.7% 0.165 254.624)" />
                <span className="text-center">
                    <h4 className="text-lg font-semibold text-neutral-500">All cought up!</h4>
                    <p className="text-sm text-neutral-400">Take a break or add a new task above.</p>
                </span>
            </div>
        </div>
    )
};

export default TaskArea