import Todo from "./Todo";
import { useTodo } from "../context/TodoContext";

interface TaskAreaProps {};

const TaskArea = ({}: TaskAreaProps) => {
    const { todos, total } = useTodo();

    return (
        <div className={`w-full h-full rounded-2xl grid content-start gap-3 overflow-scroll`}
             style={{ gridTemplateRows: `repeat(${total},4.25rem)` }}>
            { todos?.map(itm => <Todo key={itm.id} 
                                         id={itm.id} 
                                         title={itm.title} 
                                         date={itm.date} 
                                         priority={itm.priority} 
                                         status={itm.status} /> )}
        </div>
    )
};

export default TaskArea