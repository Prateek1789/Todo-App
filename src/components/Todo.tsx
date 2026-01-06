import { useRef } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { type TodoShape } from "../types/types";

const Todo = ({ id, title, priority }: TodoShape) => {

  const todoRef = useRef<HTMLDivElement | null>(null);
  const pColors = {
    high: 'from-PH to-background',
    medium: 'from-PM to-background',
    low: 'from-PL to-background',
  };

  return (
    <div ref={todoRef}
         data-id={id}
         className={`w-full h-full pl-8 flex justify-between rounded-md bg-linear-to-r from-3% to-3% ${pColors[priority]}`}>
      <div className="h-full w-full py-2 flex items-center">
        <label htmlFor={`check-todo-${id}`}
               className="flex gap-2 text-lg md:text-xl has-checked:line-through">
          <input type="checkbox" 
                 name="todo-check" 
                 id={`check-todo-${id}`} />
          {title}
        </label>
      </div>
      <div className="h-full p-2 flex items-center gap-2 rounded-md">
        <button type="button"
                className="p-1 rounded-md"
                onClick={() => console.log('Edit clicked')}>
          <Pencil size={16} color="white"/>
        </button>
        <button type="button"
                className="p-1 rounded-md"
                onClick={() => console.log('Delete clicked')}>
          <Trash2 size={16} color="white" />
        </button>
      </div>
    </div>
  )
};

export default Todo

// checked={status ? true : false}
// ${priorityColor[priority]}
// onChange={() => checkTodo(Number(todoRef.current.dataset.id))}
// onClick={() => handleEdit(Number(todoRef.current.dataset.id))}
// onClick={() => deleteTodo(Number(todoRef.current?.dataset?.id))}